let speed: number = 1000
let playing: boolean = true

let result: number = 0
type Piece = {
    x: number,
    y: number
}
type Row = Array<boolean>
type Display = Array<Row>

const dData: Display = [
    [false, false, false, false, false,],
    [false, false, false, false, false,],
    [false, false, false, false, false,],
    [false, false, false, false, false,],
    [false, false, false, false, false,],

]
const dot: Piece = { x: 2, y: 0 }

refresh(dData, dot)

function refresh(display: Display, dot: Piece): void {
    for (let y: number = 0; y <= 4; y += 1) {
        for (let x: number = 0; x <= 4; x += 1) {
            if (display[y][x] === true) {
                led.plot(x, y)
            }
            else { led.unplot(x, y) }

        }
    }
    led.plot(dot.x, dot.y)

}


if (playing === true) {
    loops.everyInterval(speed, function () {
        dot.y += 1
        if (dot.y > 4) {
            dot.y = 0

        }
        if (dot.y < 4 && dData[dot.y + 1][dot.x] === true) {
            dData[dot.y][dot.x] = true
            dot.y = 0

        }
        if (dot.y === 4) {
            dData[dot.y][dot.x] = true

        }
        if (dData[4][0] && dData[4][1] && dData[4][2] && dData[4][3] && dData[4][4]) {

            result += 1
            dot.y = 0
            for (let x: number = 0; x <= 4; x += 1) {
                dData[4][x] = false
                for (let y: number = 3; y >= 1; y -= 1) {
                    if (dData[y][x] === true) {
                        dData[y][x] = false
                        dData[y + 1][x] = true
                    }
                }
            }
        }

        refresh(dData, dot)
        input.onLogoEvent(TouchButtonEvent.Pressed, function () {

            playing = false
            whaleysans.showNumber(result);

            input.onButtonPressed(Button.AB, function () {


                for (let y: number = 0; y <= 4; y += 1) {
                    for (let x: number = 0; x <= 4; x += 1) {
                        if (dData[y][x] === true) {
                            dData[y][x] = false
                        }
                    }
                } dot.x = 2
                refresh(dData, dot)
                result = 0
                playing = true
            })
        })






        if (dot.y === 0 && dData[dot.y + 1][dot.x] === true) {
            playing = false
            whaleysans.showNumber(result)
            input.onButtonPressed(Button.AB, function () {
                playing = true

                for (let y: number = 0; y <= 4; y += 1) {
                    for (let x: number = 0; x <= 4; x += 1) {
                        if (dData[y][x] === true) {
                            dData[y][x] = false
                        }
                    }
                } dot.x = 2
                refresh(dData, dot)
                result = 0
            })




        }
    })

}

input.onButtonPressed(Button.A, function () {
    if (dot.x > 0 && !dData[dot.y][dot.x - 1] && playing === true) {
        dot.x -= 1
        refresh(dData, dot)
    }
})
input.onButtonPressed(Button.B, function () {
    if (dot.x < 4 && !dData[dot.y][dot.x + 1] && playing === true) {
        dot.x += 1
        refresh(dData, dot)
    }

})



input.logoIsPressed()
input.onLogoEvent(TouchButtonEvent.Pressed, function () {

})