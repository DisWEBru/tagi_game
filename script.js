(function () {
    let dw = {}

    dw.replace_true = {
        '1': [2,5],
        '2': [1,3,6],
        '3': [2,4,7],
        '4': [3,8],
        '5': [1,6,9],
        '6': [2,5,7,10],
        '7': [3,6,8,11],
        '8': [4,7,12],
        '9': [5,10,13],
        '10': [6,9,11,14],
        '11': [7,10,12,15],
        '12': [8,11,16],
        '13': [9,14],
        '14': [10,13,15],
        '15': [11,14,16],
        '16': [12,15]
    }

    dw.is_random = false

    dw.btn_mix = document.getElementById('mix_points')
    dw.points = document.querySelectorAll('.game__point')
    dw.point_empty = document.querySelector('.game__point-empty')

    /**
     * Случайное число от и до не включая последнее число
     * @param int начальное число
     * @param int конечное, которое не включается
     * @returns int
     */
    dw.getInterval = function (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)

        return Math.floor(Math.random() * (max - min)) + min
    }

    dw.pointMove = function (point) {
        let replace_true = dw.replace_true[point.getAttribute('data-order')]

        for (let i = 0; i < replace_true.length; i++) {
            if (dw.point_empty.getAttribute('data-order') == replace_true[i]) {
                dw.point_empty.style.order = point.getAttribute('data-order')
                dw.point_empty.setAttribute('data-order', point.getAttribute('data-order'))
                point.setAttribute('data-order', replace_true[i])
                point.style.order = replace_true[i]

                break
            }
        }

        if (dw.is_random === false)
            return

        for (let i = 0; i < dw.points.length; i++) {
            if (dw.points[i].innerText.trim() != dw.points[i].getAttribute('data-order') && i < 15)
                return
        }

        dw.is_random = false

        for (let i = 0; i < dw.points.length; i++) {
            dw.points[i].style.background = '#91102e'
        }

        setTimeout(function () {
            for (let i = 0; i < dw.points.length; i++) {
                dw.points[i].style.background = null
            }
        }, 500)
    }

    dw.btn_mix.addEventListener('click', function () {
        let n = 0

        while (true) {
            let ar = dw.replace_true[dw.point_empty.getAttribute('data-order')]

            let k = dw.getInterval(0, ar.length)

            dw.pointMove(document.querySelector('.game__point[data-order="' + ar[k] + '"]'))

            if (n > 100
                && document.querySelector('.game__point-1').getAttribute('data-order') != '1'
            )
                break

            n++

            if (n > 10000) {
                console.log('Было больше 10 000 перемешиваний')

                break
            }
        }

        dw.is_random = true
    })

    for (let i = 0; i < dw.points.length; i++) {
        dw.points[i].setAttribute('data-order', (i + 1))

        if (dw.points[i].classList.contains('game__point-empty'))
            continue

        dw.points[i].addEventListener('click', function () {
            dw.pointMove(this)
        })
    }
})()