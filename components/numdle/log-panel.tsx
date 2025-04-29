import { numdleLog } from "@/type";

/**
 * A component to display the result of user input.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param logs numdleLog [ ]
 * @returns 
 */
export default function LogPanel({logs}: {logs: numdleLog[]}) {
    return (
        <div className="h-1/2">
            <div className="mb-5">
                <h2 className="text-lime-400">Perfect: {(logs.length > 0) ? logs[logs.length - 1].perfect : ""}</h2>
                <h2 className="text-yellow-400">Imperfect: {(logs.length > 0) ? logs[logs.length - 1].imperfect : ""}</h2>
                <h2 className="text-red-500 my-1">Attempts: {logs.length}</h2>
            </div>
            <h1>Perviouse Guesses</h1>
            {
                logs.length > 0 ?
                <ul className="max-h-80 p-2 border rounded overflow-y-scroll">
                    {[...logs].reverse().map((log, i) => 
                        <li key={i}>
                            <p>
                                guess: {log.guess} 
                                <span className="text-lime-400"> perfect: {log.perfect}</span> 
                                <span className="text-yellow-400"> imperfect: {log.imperfect}</span>
                            </p>
                        </li>
                    )}
                </ul>
                : <></>
            }
            
        </div>
    )
}