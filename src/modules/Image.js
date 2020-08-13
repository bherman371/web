class Image {

  static getOrientation (file, callback) {
    var reader = new FileReader()
    reader.onload = function (e) {
      var view = new DataView(e.target.result)
      if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2)
      }
      var length = view.byteLength
      var offset = 2
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) return callback(-1)
        var marker = view.getUint16(offset, false)
        offset += 2
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return callback(-1)
          }
          var little = view.getUint16(offset += 6, false) === 0x4949
          offset += view.getUint32(offset + 4, little)
          var tags = view.getUint16(offset, little)
          offset += 2
          for (var i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little))
            }
          }
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break
        } else {
          offset += view.getUint16(offset, false)
        }
      }
      return callback(-1)
    }
    reader.readAsArrayBuffer(file)
  }

  static stripExif (file, callback) {
    var fr = new FileReader()
    fr.onload = function (e) {
      var dv = new DataView(e.target.result)
      console.log(dv)
      var offset = 0
      var recess = 0
      var pieces = []
      var i = 0
      if (dv.getUint16(offset) === 0xffd8) {
        offset += 2
        var app1 = dv.getUint16(offset)
        offset += 2
        while (offset < dv.byteLength) {
          console.log(offset, '0x' + app1.toString(16), recess)
          if (app1 === 0xffe1) {
            pieces[i] = {recess: recess, offset: offset - 2}
            recess = offset + dv.getUint16(offset)
            i++
          } else if (app1 === 0xffda) {
            break
          }
          offset += dv.getUint16(offset)
          app1 = dv.getUint16(offset)
          offset += 2
        }
        console.log(pieces.length)
        if (pieces.length > 0) {
          var newPieces = []
          pieces.forEach(function (v) {
            newPieces.push(this.result.slice(v.recess, v.offset))
          }, this)
          newPieces.push(this.result.slice(recess))
          var br = new Blob(newPieces, {type: 'image/jpeg'})
          return callback(br)
        } else {
          return callback(file)
        }
      }
    }
    fr.readAsArrayBuffer(file)
  }

  static resetOrientation (srcBase64, srcOrientation, callback) {
    var img = new Image()
    img.onload = function () {
      var width = img.width
      var height = img.height
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')

      // set proper canvas dimensions before transform & export
      if (srcOrientation > 4 && srcOrientation < 9) {
        canvas.width = height
        canvas.height = width
      } else {
        canvas.width = width
        canvas.height = height
      }
      // transform context before drawing image
      switch (srcOrientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, width, 0)
          break
        case 3:
          ctx.transform(-1, 0, 0, -1, width, height)
          break
        case 4:
          ctx.transform(1, 0, 0, -1, 0, height)
          break
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0)
          break
        case 6:
          ctx.transform(0, 1, -1, 0, height, 0)
          break
        case 7:
          ctx.transform(0, -1, -1, 0, height, width)
          break
        case 8:
          ctx.transform(0, -1, 1, 0, 0, width)
          break
        default:
          break
      }
      // draw image
      ctx.drawImage(img, 0, 0)
      // export base64
      callback(canvas.toDataURL())
    }
    img.src = srcBase64
  }
}

export default Image
