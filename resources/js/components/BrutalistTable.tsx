import { ReactNode } from 'react';

interface Column {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => ReactNode;
}

interface BrutalistTableProps {
    columns: Column[];
    data: any[];
    className?: string;
}

export default function BrutalistTable({
    columns,
    data,
    className = ''
}: BrutalistTableProps) {
    return (
        <table className={`table-brutalist ${className}`.trim()}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            TIDAK ADA DATA
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.render
                                        ? column.render(row[column.accessor], row)
                                        : row[column.accessor]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
