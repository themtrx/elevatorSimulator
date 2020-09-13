const floorBtn = Array.from(document.querySelectorAll('.floor-btn'))
const elevatorFloors = Array.from(document.querySelectorAll('.elevator'))
const elevatorOrder = []

const openAndCloseDoors = (floorIndex) => {
    const leftDoor = elevatorFloors[floorIndex].querySelector('.elevator-door-left')
    const rightDoor = elevatorFloors[floorIndex].querySelector('.elevator-door-right')

    leftDoor.style.width = '45%'
    rightDoor.style.width = '45%'

    const closeDoors = () => {
        
        leftDoor.style.width = '0%'
        rightDoor.style.width = '0%'
    }

    const waitToClose =  setTimeout(closeDoors, 3000);
}

floorBtn.map((floor, floorIndex) => {
    floor.addEventListener('click', (e) => {
        const floorWrap = e.target.parentElement

        if(e.target.dataset){

            const floorCalled = Array.from(floorWrap.querySelectorAll('span'))
            floorCalled.map((btn) => btn.classList.remove('active-btn'))
            e.target.classList.add('active-btn')

            elevatorOrder.push({
                    floorIndex,
                    direction: e.target.dataset.direction
                })

            moveElevator()
        }
    })
})

const moveElevator = () => {
    const {
        floorIndex,
        direction
    } = elevatorOrder[0]

    let elevatorIndex = 0;
    
    elevatorFloors.map((floor, index) => {
        const classToArr = Array.from(floor.classList)
        if(classToArr.includes('on-floor')){
            elevatorIndex = index
            return
        }
    })[0]

    

    const callElevator = ()=> {
        const targetReached = floorIndex === elevatorIndex

        if(targetReached){
            const btn = floorBtn[elevatorIndex].querySelector('span')
            clearInterval(startMove)
            elevatorOrder.shift()
            openAndCloseDoors(floorIndex)
            return
        }

       if(floorIndex> elevatorIndex) {
            elevatorIndex++
            elevatorFloors[elevatorIndex-1].classList.remove('on-floor')
            elevatorFloors[elevatorIndex].classList.add('on-floor')
        }else {
            elevatorIndex--
            elevatorFloors[elevatorIndex+1].classList.remove('on-floor')
            elevatorFloors[elevatorIndex].classList.add('on-floor')
        }
        
    }

    const startMove = setInterval(callElevator, 1000)


}