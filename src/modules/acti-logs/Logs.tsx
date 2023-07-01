import { useEffect, useState } from "react";
import { Api } from "../../config/apisConfig";

function Logs() {
    const [logs, setLogs] = useState<any[]>([]);
    const getLog = async () => {
        const res = await Api.get("/logs", {});
        setLogs(res.data.reverse());
    }
    useEffect(() => {
        getLog();
    }, []);
    return <div style={{ flex: 1, overflow: "auto" }}>
        <table>
            <thead>
                <tr>
                    <th>time</th>
                    <th>type</th>
                    <th>ip</th>
                    <th>width</th>
                    <th>height</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((e, k) => {
                    return <tr key={k}>
                        <td style={{ fontSize: "x-small" }}>
                            {new Date(Number(e.time)).toLocaleDateString("vi")} <br />
                            {new Date(Number(e.time)).toLocaleTimeString("vi")}</td>
                        <td>{e.type}</td>
                        <td>{e.ip === "2402:9d80:26d:5837:9dc6:778:4f8d:1004" ? "tan" : "minh"}</td>
                        <td>{e.deviceWidth}</td>
                        <td>{e.deviceHeight}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default Logs;