"use client";

import { useState } from "react";
import { 
  Calculator, 
  Route, 
  Users, 
  BarChart3, 
  Truck, 
  DollarSign, 
  MapPin, 
  Shield, 
  Clock, 
  Heart, 
  FileText, 
  AlertTriangle,
  Fuel,
  Navigation,
  Phone,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function CaminhoCerto() {
  const [activeModule, setActiveModule] = useState("escritorio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados para funcionalidades demonstrativas
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState("");
  const [precoFrete, setPrecoFrete] = useState(0);

  const calcularFrete = () => {
    if (distancia) {
      const dist = parseFloat(distancia);
      const precoBase = dist * 2.5; // R$ 2,50 por km
      const pedagios = dist * 0.3; // Estimativa de pedágios
      const combustivel = dist * 0.8; // Estimativa combustível
      const total = precoBase + pedagios + combustivel;
      setPrecoFrete(total);
    }
  };

  const modules = [
    {
      id: "escritorio",
      name: "Meu Escritório",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      description: "Gestão Financeira"
    },
    {
      id: "copiloto", 
      name: "Meu Copiloto",
      icon: Route,
      color: "from-green-500 to-green-600",
      description: "Rotas & Navegação"
    },
    {
      id: "comunidade",
      name: "Nossa Comunidade", 
      icon: Users,
      color: "from-purple-500 to-purple-600",
      description: "Rede Social"
    },
    {
      id: "analise",
      name: "Análise de Viagens",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600", 
      description: "Relatórios"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Caminho Certo
                </h1>
                <p className="text-sm text-gray-600">Seu assistente na estrada</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <Button
                    key={module.id}
                    variant={activeModule === module.id ? "default" : "ghost"}
                    onClick={() => setActiveModule(module.id)}
                    className={`flex items-center space-x-2 ${
                      activeModule === module.id 
                        ? `bg-gradient-to-r ${module.color} text-white` 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden lg:inline">{module.name}</span>
                  </Button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                {modules.map((module) => {
                  const IconComponent = module.icon;
                  return (
                    <Button
                      key={module.id}
                      variant={activeModule === module.id ? "default" : "outline"}
                      onClick={() => {
                        setActiveModule(module.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex flex-col items-center space-y-1 h-auto py-3 ${
                        activeModule === module.id 
                          ? `bg-gradient-to-r ${module.color} text-white` 
                          : ""
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="text-xs">{module.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meu Escritório */}
        {activeModule === "escritorio" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Meu Escritório</h2>
              <p className="text-gray-600">Gerencie suas finanças e negócios</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calculadora de Frete */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <span>Calculadora de Frete</span>
                  </CardTitle>
                  <CardDescription>
                    Calcule o preço ideal para seus fretes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origem">Origem</Label>
                      <Input
                        id="origem"
                        placeholder="São Paulo, SP"
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="destino">Destino</Label>
                      <Input
                        id="destino"
                        placeholder="Rio de Janeiro, RJ"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="distancia">Distância (km)</Label>
                    <Input
                      id="distancia"
                      type="number"
                      placeholder="450"
                      value={distancia}
                      onChange={(e) => setDistancia(e.target.value)}
                    />
                  </div>
                  <Button onClick={calcularFrete} className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                    Calcular Frete
                  </Button>
                  {precoFrete > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 mb-1">Preço sugerido:</p>
                      <p className="text-2xl font-bold text-green-800">
                        R$ {precoFrete.toFixed(2)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Controle de Gastos */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Controle de Gastos</span>
                  </CardTitle>
                  <CardDescription>
                    Acompanhe suas despesas mensais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Combustível</span>
                      <span className="text-sm text-gray-600">R$ 2.450,00</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Manutenção</span>
                      <span className="text-sm text-gray-600">R$ 850,00</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Alimentação</span>
                      <span className="text-sm text-gray-600">R$ 420,00</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Mensal</span>
                        <span className="font-bold text-lg">R$ 3.720,00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gestão de Contas */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span>Gestão de Contas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-800">Parcela Caminhão</p>
                        <p className="text-sm text-red-600">Vence em 3 dias</p>
                      </div>
                      <Badge variant="destructive">R$ 2.800,00</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium text-green-800">Frete Recebido</p>
                        <p className="text-sm text-green-600">Hoje</p>
                      </div>
                      <Badge className="bg-green-600">R$ 4.200,00</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium text-yellow-800">Seguro</p>
                        <p className="text-sm text-yellow-600">Vence em 15 dias</p>
                      </div>
                      <Badge variant="secondary">R$ 450,00</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notas Fiscais */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <span>Notas Fiscais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600">
                      Emitir Nova NF
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      <p>Últimas NFs emitidas:</p>
                      <div className="mt-2 space-y-1">
                        <p>NF 001234 - R$ 4.200,00</p>
                        <p>NF 001233 - R$ 3.800,00</p>
                        <p>NF 001232 - R$ 5.100,00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Meu Copiloto */}
        {activeModule === "copiloto" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Meu Copiloto</h2>
              <p className="text-gray-600">Navegação inteligente e assistência na estrada</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Roteirizador */}
              <Card className="shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-green-600" />
                    <span>Roteirizador Inteligente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Rota Atual: São Paulo → Rio de Janeiro</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-green-800">Distância</p>
                        <p className="text-green-700">429 km</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Tempo Estimado</p>
                        <p className="text-green-700">5h 30min</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Pedágios</p>
                        <p className="text-green-700">R$ 87,50</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Postos de Combustível */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fuel className="h-5 w-5 text-blue-600" />
                    <span>Postos na Rota</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Posto Ipiranga</p>
                        <p className="text-sm text-gray-600">BR-116, km 245</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">R$ 5,89</p>
                        <p className="text-xs text-gray-500">Diesel S-10</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Shell Select</p>
                        <p className="text-sm text-gray-600">BR-116, km 312</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ 5,79</p>
                        <p className="text-xs text-gray-500">Diesel S-10</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">BR Distribuidora</p>
                        <p className="text-sm text-gray-600">BR-116, km 387</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">R$ 5,95</p>
                        <p className="text-xs text-gray-500">Diesel S-10</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lembretes de Saúde */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span>Lembretes de Saúde</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <Clock className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Parada Obrigatória</p>
                        <p className="text-sm text-red-600">Em 45 minutos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Heart className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Hidratação</p>
                        <p className="text-sm text-blue-600">Beba água agora</p>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600">
                      Ver Exercícios de Alongamento
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Alertas de Segurança */}
              <Card className="shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span>Alertas na Rota</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Fiscalização</p>
                        <p className="text-sm text-yellow-600">BR-116, km 280</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-800">Obras na Pista</p>
                        <p className="text-sm text-orange-600">BR-116, km 350</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <Shield className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Área de Risco</p>
                        <p className="text-sm text-red-600">Evitar paradas noturnas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Ponto de Descanso</p>
                        <p className="text-sm text-blue-600">Área segura - km 320</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Nossa Comunidade */}
        {activeModule === "comunidade" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Nossa Comunidade</h2>
              <p className="text-gray-600">Conecte-se com outros caminhoneiros</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Feed da Comunidade */}
              <Card className="shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>Feed da Comunidade</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">JC</span>
                        </div>
                        <div>
                          <p className="font-medium">João Carlos</p>
                          <p className="text-sm text-gray-500">há 2 horas</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Pessoal, cuidado na BR-381 próximo a Betim. Tem fiscalização pesada hoje! 
                        Documentação em dia sempre! 🚛
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <button className="hover:text-purple-600">👍 24 curtidas</button>
                        <button className="hover:text-purple-600">💬 8 comentários</button>
                      </div>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">MS</span>
                        </div>
                        <div>
                          <p className="font-medium">Maria Silva</p>
                          <p className="text-sm text-gray-500">há 4 horas</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Encontrei um posto com diesel a R$ 5,65 na BR-116, km 245. 
                        Vale a pena abastecer lá! ⛽
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <button className="hover:text-purple-600">👍 18 curtidas</button>
                        <button className="hover:text-purple-600">💬 12 comentários</button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">RP</span>
                        </div>
                        <div>
                          <p className="font-medium">Roberto Pereira</p>
                          <p className="text-sm text-gray-500">há 6 horas</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Alguém conhece um bom restaurante na região de Campinas? 
                        Preciso de uma refeição decente! 🍽️
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <button className="hover:text-purple-600">👍 7 curtidas</button>
                        <button className="hover:text-purple-600">💬 15 comentários</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Painel Lateral */}
              <div className="space-y-6">
                {/* Botão SOS */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span>Emergência</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4">
                      <Phone className="h-5 w-5 mr-2" />
                      BOTÃO SOS
                    </Button>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Em caso de emergência, pressione para enviar sua localização
                    </p>
                  </CardContent>
                </Card>

                {/* Documentos */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>Meus Documentos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">CNH</span>
                        <Badge className="bg-green-600">Válida</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">RNTRC</span>
                        <Badge className="bg-green-600">Válido</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Seguro</span>
                        <Badge variant="destructive">Vence em 15 dias</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">ANTT</span>
                        <Badge className="bg-green-600">Válido</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Caminhoneiros Online */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm">Caminhoneiros Online</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">João Carlos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Maria Silva</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Roberto Pereira</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Ana Costa</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      1.247 caminhoneiros online
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Análise de Viagens */}
        {activeModule === "analise" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise de Viagens</h2>
              <p className="text-gray-600">Acompanhe seu desempenho e eficiência</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Cards de Métricas */}
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Viagens Este Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <p className="text-xs text-gray-600">+2 vs mês anterior</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Km Rodados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">8.450</div>
                  <p className="text-xs text-gray-600">+850 km vs mês anterior</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Consumo Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">2.8</div>
                  <p className="text-xs text-gray-600">km/l - Dentro da meta</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Lucro Líquido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">R$ 18.500</div>
                  <p className="text-xs text-gray-600">+12% vs mês anterior</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Performance */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Performance Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Eficiência de Combustível</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pontualidade</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Margem de Lucro</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfação Cliente</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Últimas Viagens */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Últimas Viagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium text-green-800">SP → RJ</p>
                        <p className="text-sm text-green-600">429 km • 5h 30min</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700">R$ 4.200</p>
                        <p className="text-xs text-green-600">Lucro: R$ 1.850</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-blue-800">RJ → BH</p>
                        <p className="text-sm text-blue-600">434 km • 6h 15min</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-700">R$ 3.800</p>
                        <p className="text-xs text-blue-600">Lucro: R$ 1.650</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div>
                        <p className="font-medium text-purple-800">BH → SP</p>
                        <p className="text-sm text-purple-600">586 km • 7h 45min</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-700">R$ 5.100</p>
                        <p className="text-xs text-purple-600">Lucro: R$ 2.200</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparativo Mensal */}
              <Card className="shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle>Comparativo Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Receita Bruta</p>
                      <p className="text-2xl font-bold text-blue-600">R$ 42.500</p>
                      <p className="text-sm text-green-600">+15% vs mês anterior</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Custos Totais</p>
                      <p className="text-2xl font-bold text-red-600">R$ 24.000</p>
                      <p className="text-sm text-red-600">+8% vs mês anterior</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Lucro Líquido</p>
                      <p className="text-2xl font-bold text-green-600">R$ 18.500</p>
                      <p className="text-sm text-green-600">+25% vs mês anterior</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600">
                      Exportar Relatório Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Caminho Certo
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Seu assistente completo na estrada. Gerencie, navegue e conecte-se com segurança.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Versão 1.0.0</span>
              <span>•</span>
              <span>Suporte 24/7</span>
              <span>•</span>
              <span>Comunidade de 50.000+ caminhoneiros</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}