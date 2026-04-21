import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DataTable,
    FilterTable,
    useDataTable,
    parseBooleanParam,
    useCsvExport,
    type FilterType,
} from "@/components/common/DataTable";
import type { UsuarioResponseDto } from "@/subsystems/usuarios/api/features/usuarios/dto";
import { usuarioFilter } from "@/subsystems/usuarios/api/features/usuarios/instances/usuario-filter";
import { createApplyFilters } from "@/components/common/FilterTable/helpers";
import { columns } from "../components/Columns";
import { useNavigate } from "@tanstack/react-router";
import { PREFIX_USUARIOS, ROUTES_USUARIOS } from "@/subsystems/usuarios/routes/ROUTES_USUARIOS";
export default function TablaUsuariosPage() {

    const navigate = useNavigate();

    const { queryParams, updateQueryParams, resetQueryParams } = useDataTable({
        defaults: { pageSize: 10 },
        filterKeys: ["nombre", "correo", "activo"],
    });

    const nombre = (queryParams.nombre as string) ?? "";
    const correo = (queryParams.correo as string) ?? "";
    const activo = (queryParams.activo as string) ?? "";
    const activoBool = parseBooleanParam(queryParams.activo as string | undefined);

    const filters = {
        nombre,
        correo,
        estaActivo: activoBool,
        page: queryParams.page,
        pageSize: queryParams.pageSize,
    };

    const { data: response, isLoading } = useQuery({
        queryKey: [
            "usuarios-tabla",
            queryParams,
        ], queryFn: () => usuarioFilter.getByFilters(filters),
    });

    const usuarios = response?.items ?? [];
    const totalPages = response?.totalPages ?? 1;
    const totalRecords = response?.totalItems ?? 0;

    const exportCsv = useCsvExport<UsuarioResponseDto>({
        fileName: "usuarios.csv",
    });

    const handleExportCSV: Parameters<
        typeof DataTable<UsuarioResponseDto>
    >[0]["onExportCSV"] = ({ selectedRows, rowsForExport }) => {
        exportCsv({
            visibleHeaders: ["Nombre", "Correo"],
            getRowValues: (row) => [row.nombreCompleto, row.correo ?? ""],
            selectedRows,
            rowsForExport,
        });
    };


    // const activos = usuarios.filter((u) => u.estaActivo).length;
    // const inactivos = usuarios.length - activos;

    type UsuarioFilterKeys = "nombre" | "correo" | "activo";

    const filtros: FilterType<UsuarioFilterKeys>[] = [
        {
            type: "text",
            key: "nombre",
            label: "Nombre",
            value: nombre,
            onChange: (v) => updateQueryParams({ nombre: v || undefined }),
        },
        {
            type: "text",
            key: "correo",
            label: "Correo",
            value: correo,
            onChange: (v) => updateQueryParams({ correo: v || undefined }),
        },
        {
            type: "select",
            key: "activo",
            label: "Estado",
            value: activo,
            options: [
                { value: "true", label: "Activos" },
                { value: "false", label: "Inactivos" },
            ],
            onChange: (v) => updateQueryParams({ activo: v || undefined }),
        },
    ];

    const handleResetAll = () => resetQueryParams();
    const handleApplyFilters = createApplyFilters(updateQueryParams);
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto py-8 space-y-6">

                {/* Header */}
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Usuarios</h1>
                        <p className="text-muted-foreground">
                            Gestión de usuarios del sistema
                        </p>
                    </div>

                    <Button
                        className="gap-2"
                        onClick={() => {
                            navigate({ to: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearUsuario}` })
                        }
                        }
                    >
                        <Users className="h-4 w-4" />
                        Nuevo usuario
                    </Button>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-2 gap-4">
                    <StateCard label="Activos" value={activos} icon={<UserCheck />} />
                    <StateCard label="Inactivos" value={inactivos} icon={<UserX />} />
                </div> */}

                {/* Tabla */}
                <Card>
                    <CardContent className="pt-6">
                        <DataTable
                            loading={isLoading}
                            data={usuarios}
                            columns={columns}
                            totalPages={totalPages}
                            totalRecords={totalRecords}
                            queryParams={queryParams}
                            onQueryChange={updateQueryParams}
                            onExportCSV={handleExportCSV}
                            onResetAll={handleResetAll}
                            toolbar={
                                <FilterTable
                                    filters={filtros}
                                    onApply={handleApplyFilters}
                                    onClear={handleResetAll}
                                />
                            }
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}