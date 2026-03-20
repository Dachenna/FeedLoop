// components/web/data-table.tsx
'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Define the expected shape (TypeScript safety)
export type Response = {
  id: string
  survey: string
  respondent: string
  date: string
  score: string
  sentiment: "Positive" | "Neutral" | "Negative"
  action: string
}

const columns: ColumnDef<Response>[] = [
  {
    accessorKey: "survey",
    header: "Survey",
  },
  {
    accessorKey: "respondent",
    header: "Respondent",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("sentiment") as string
      return (
        <Badge
          variant={
            sentiment === "Positive" ? "default" :
            sentiment === "Neutral" ? "secondary" :
            "destructive"
          }
        >
          {sentiment}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm">
        View
      </Button>
    ),
  },
]

interface DataTableProps {
  data: Response[]
}

export function DataTable({ data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border glass overflow-hidden flex-1 min-h-0">
      <Table className="min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((data) => (
            <TableRow key={data.id}>
              {data.headers.map((data) => (
                <TableHead key={data.id}>
                  {data.isPlaceholder
                    ? null
                    : flexRender(
                        data.column.columnDef.header,
                        data.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No responses yet. Create your first survey to start collecting feedback!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}