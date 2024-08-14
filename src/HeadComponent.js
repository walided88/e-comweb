import "./FirstComponentStyle.css"




export default function HeadComponent({children}){
    return (
        <div>
            <h1 className="redBg">Welcome to My Website</h1>
            <h2 className="redBg">{children}</h2>

        </div>
    )
}