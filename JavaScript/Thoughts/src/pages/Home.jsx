import React from 'react'

function Home() {

    let myArr = [1, 2, 3, 4, 5]

    return (
        <div className=' bg-[#0E1113] text-white  w-[900px] h-[90vh] '>
            {myArr.map((i, idx) => (<p key={idx}>i {i}</p>))}
        </div>
    )
}

export default Home