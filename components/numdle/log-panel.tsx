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
            <div className="flex flex-col mb-4">
                <h2 className="text-lime-400">Perfect: {(logs.length > 0) ? logs[logs.length - 1].perfect : ""}</h2>
                <h2 className="text-yellow-400">Imperfect: {(logs.length > 0) ? logs[logs.length - 1].imperfect : ""}</h2>
                <h2 className="text-red-500">Attempts: {logs.length}</h2>
            </div>
            
            {
                logs.length > 0 ?
                <>
                    <h1>Previous Guesses</h1>
                    <ul className="max-h-80 p-2 border rounded overflow-y-scroll space-y-4">
                        {[...logs].reverse().map((log, i) => 
                            <li key={i}>
                                <div className="flex justify-between flex-col">
                                    <span>Guess: {log.guess} </span>
                                    <span className="text-sm text-lime-400"> Perfect: {log.perfect}</span> 
                                    <span className="text-sm text-yellow-400"> Imperfect: {log.imperfect}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                    </>
                : <>
                </>
            }
            
        </div>
    )
}