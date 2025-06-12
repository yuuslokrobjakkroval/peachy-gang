import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react"

export function DataTableShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Data Table</h2>
        <p className="text-muted-foreground mb-4">
          A data table component for displaying and interacting with tabular data.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-card-foreground">Basic Data Table</h3>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your team members and their account permissions here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-8 w-[250px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">Olivia Martin</TableCell>
                    <TableCell>olivia.martin@email.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Active
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">Jackson Lee</TableCell>
                    <TableCell>jackson.lee@email.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Active
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">Isabella Nguyen</TableCell>
                    <TableCell>isabella.nguyen@email.com</TableCell>
                    <TableCell>Viewer</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        Inactive
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">William Kim</TableCell>
                    <TableCell>william.kim@email.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Active
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">Sofia Davis</TableCell>
                    <TableCell>sofia.davis@email.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Active
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1</strong> to <strong>5</strong> of <strong>100</strong> results
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
