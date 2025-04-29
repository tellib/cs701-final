import { numdleRecord } from "@/type";

/**
 * A list-item component that display a user's best numdle records
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param props numdleRecord
 * @returns 
 */
export default function NumdleItem(props: {numdleRecord: numdleRecord}) {
    if (props.numdleRecord.gamePlayed === 0) {
        return (
            <>
            </>
        );
    }

    return (
        <li className="w-1/5 border-2 border-black rounded m-3"> 
            <div>
                <h1 className="text-center bg-black text-white fw-bold">Numdle</h1>
                <ul>
                    <li>Total Game Cleared: {props.numdleRecord.gamePlayed}</li>
                    <li>Best Attempts: {props.numdleRecord.bestAttempts}</li>
                    <li>Best Clear Time: {props.numdleRecord.bestClearTime?.getMinutes()}:{props.numdleRecord.bestClearTime?.getSeconds()}</li>
                </ul>
            </div>
        </li>
    )
}