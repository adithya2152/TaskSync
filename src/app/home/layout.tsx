import Header from "@/components/Header";
import "@/styles/dashStyle.css"
import { ThemeProviderWrapper } from "@/providers/ThemeProvider";
export default function Dash({
    children,
    center,
    duetoday,
    piecat,
    pietask,
    taskstat,
}:{
    children: React.ReactNode,
    center: React.ReactNode,
    duetoday: React.ReactNode,
    piecat: React.ReactNode,
    pietask: React.ReactNode,
    taskstat: React.ReactNode,
})
{
    return (
        <div >
            <Header NavMOde="home"/>
           <ThemeProviderWrapper> {children} </ThemeProviderWrapper>
            <div className="dashboard_container">
                <div className="item item1">{duetoday}</div>
                <div className="item item2">{center}</div>
                <div className="item item3">{piecat}</div>
                <div className="item item4">{pietask}</div>
                <div className="item item5"> {taskstat}</div>
            </div>
        </div>
    )
}