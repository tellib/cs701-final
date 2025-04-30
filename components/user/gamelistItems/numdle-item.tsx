import { numdleRecord } from "@/type";
import { Card, Table } from "@mui/joy";

/**
 * A list-item component that display a user's best numdle records
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @param props numdleRecord
 * @returns
 */
export default function NumdleItem(props: { numdleRecord: numdleRecord }) {
  if (props.numdleRecord.gamePlayed === 0) {
    return <></>;
  }

  return (
    <Card>
      <h1 className="text-center bg-black text-white fw-bold rounded text-lg">
        Numdle
      </h1>
      <ul>
        <li>Total Games Cleared: {props.numdleRecord.gamePlayed}</li>
        <li>Best Attempts: {props.numdleRecord.bestAttempts}</li>
        <li>
          Best Clear Time: {props.numdleRecord.bestClearTime?.getMinutes()}:
          {props.numdleRecord.bestClearTime?.getSeconds()}
        </li>
      </ul>
    </Card>
  );
}
