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
        <div className="flex flex-col bg-blue-950 gap-2 p-4 rounded-xl text-white flex-1">
            <div className="flex flex-col mb-4">
                <h1 className="text-lg">Current Guess</h1>
                <pre className="text-lime-400">Perfect: {(logs.length > 0) ? logs[logs.length - 1].perfect : ""}</pre>
                <pre className="text-yellow-400">Imperfect: {(logs.length > 0) ? logs[logs.length - 1].imperfect : ""}</pre>
                <pre className="text-red-500">Attempts: {logs.length}</pre>
            </div>
            
            {
                logs.length > 0 ?
                <>
                    <h1 className="text-lg">Previous Guesses</h1>
                    <ul className="p-2 border border-current/20 rounded overflow-y-scroll space-y-4 max-h-100">
                        {[...logs].reverse().map((log, i) => 
                            <li key={i}>
                                <div className="flex justify-between flex-col">
                                    <pre>Guess: {log.guess} </pre>
                                    <pre className="text-sm text-lime-400">Perfect: {log.perfect}</pre> 
                                    <pre className="text-sm text-yellow-400">Imperfect: {log.imperfect}</pre>
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