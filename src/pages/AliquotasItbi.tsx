
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Building2, MapPin, Percent, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEstados } from '@/hooks/useEstados';

const AliquotasItbi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUF, setSelectedUF] = useState('');
  
  const { data: estados } = useEstados();

  const { data: aliquotas, isLoading } = useQuery({
    queryKey: ['aliquotas-itbi'],
    queryFn: async () => {
      const { data } = await supabase
        .from('aliquotas_itbi')
        .select(`
          *,
          estados!aliquotas_itbi_estado_id_fkey (
            nome,
            uf
          )
        `)
        .order('aliquota', { ascending: false });
      
      return data || [];
    },
  });

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const filteredAliquotas = aliquotas?.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const municipio = item.municipio?.toLowerCase() || '';
    const estado = item.estados?.nome?.toLowerCase() || '';
    const uf = item.estados?.uf?.toLowerCase() || '';
    const aliquotaStr = formatPercentage(item.aliquota).toLowerCase();
    
    // Filtro por UF selecionada
    const matchesUF = !selectedUF || selectedUF === 'todos' || item.estados?.uf === selectedUF;
    
    // Filtro por busca de texto
    const matchesSearch = !searchTerm || (
      municipio.includes(searchLower) ||
      estado.includes(searchLower) ||
      uf.includes(searchLower) ||
      aliquotaStr.includes(searchLower)
    );
    
    return matchesUF && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Alíquotas de ITBI
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Consulte as alíquotas do Imposto sobre Transmissão de Bens Imóveis (ITBI) 
            por município e estado brasileiro
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Pesquisar por município, estado, UF ou alíquota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-300 focus:border-blue-500"
              />
            </div>
            
            {/* Filter by UF */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={selectedUF} onValueChange={setSelectedUF}>
                <SelectTrigger className="w-48 h-10">
                  <SelectValue placeholder="Filtrar por UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os estados</SelectItem>
                  {estados?.map((estado) => (
                    <SelectItem key={estado.id} value={estado.uf}>
                      {estado.uf} - {estado.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Percent className="w-7 h-7" />
              Lista de Alíquotas por Município
            </CardTitle>
            <p className="text-blue-100">
              {filteredAliquotas?.length || 0} registros encontrados
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Carregando alíquotas...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Município
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">UF</TableHead>
                      <TableHead className="font-semibold text-gray-700">Estado</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Percent className="w-4 h-4" />
                          Alíquota
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAliquotas?.map((item, index) => (
                      <TableRow key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <TableCell className="font-medium py-4">
                          {item.municipio || 'Aplicação geral'}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.estados?.uf}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 text-gray-600">
                          {item.estados?.nome}
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            {formatPercentage(item.aliquota)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AliquotasItbi;
