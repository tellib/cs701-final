import { numdleLeaderBoardData } from "@/type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

interface boardProps {
    data: numdleLeaderBoardData[],
}

export default function NumdleTable(props: boardProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Attempt Used</TableHead>
                    <TableHead>Clear Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {props.data.map((data, index) => (
                <TableRow key={data.userName}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.userName}</TableCell>
                    <TableCell>{data.attempts}</TableCell>
                    <TableCell>{data.clearTime?.getMinutes()}:{data.clearTime?.getSeconds()}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    ) 
}