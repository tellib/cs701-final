import { numdleLeaderBoardData } from "@/type";
import { Card, Table } from "@mui/joy";

interface boardProps {
  data: numdleLeaderBoardData[];
}

/**
 * A table component for numdle to display data on leaderboard.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @returns
 */
export default function NumdleTable(props: boardProps) {
  return (
      <Card>
        <Table variant="soft" stickyHeader borderAxis="both">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User Name</th>
              <th>Attempt Used</th>
              <th>Clear Time</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((data, index) => (
              <tr key={data.userName}>
                <td>{index + 1}</td>
                <td>{data.userName}</td>
                <td>{data.attempts}</td>
                <td>
                  {data.clearTime?.getMinutes()}:{data.clearTime?.getSeconds()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
  );
}
