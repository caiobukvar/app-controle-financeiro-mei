import { useState } from "react";

export default function App() {
  const [receitas, setReceitas] = useState([
    { id: 1, descricao: "Venda de Produto", valor: 1200 },
    { id: 2, descricao: "Servico Prestado", valor: 850 },
  ]);

  const [despesas, setDespesas] = useState([
    { id: 1, descricao: "Internet", valor: 120 },
    { id: 2, descricao: "Energia", valor: 210 },
  ]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");

  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  function adicionarMovimentacao(e) {
    e.preventDefault();

    if (!descricao || !valor) {
      alert("Preencha todos os campos");
      return;
    }

    const novaMovimentacao = {
      id: Date.now(),
      descricao,
      valor: Number(valor),
    };

    if (tipo === "receita") {
      setReceitas([...receitas, novaMovimentacao]);
    } else {
      setDespesas([...despesas, novaMovimentacao]);
    }

    setDescricao("");
    setValor("");
  }

  function removerReceita(id) {
    setReceitas(receitas.filter((item) => item.id !== id));
  }

  function removerDespesa(id) {
    setDespesas(despesas.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Controle Financeiro MEI
          </h1>

          <p className="text-gray-600 mt-2">
            Controle simples de receitas e despesas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">
              Receitas
            </h2>

            <p className="text-3xl font-bold text-green-600">
              R$ {totalReceitas.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">
              Despesas
            </h2>

            <p className="text-3xl font-bold text-red-600">
              R$ {totalDespesas.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">
              Saldo Atual
            </h2>

            <p
              className={`text-3xl font-bold ${
                saldo >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              R$ {saldo.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nova Movimentacao
          </h2>

          <form
            onSubmit={adicionarMovimentacao}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 outline-none"
            />

            <input
              type="number"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 outline-none"
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 outline-none"
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold transition"
            >
              Adicionar
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Receitas
            </h2>

            <div className="space-y-3">
              {receitas.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.descricao}
                    </p>

                    <p className="text-green-600 font-bold">
                      R$ {item.valor.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removerReceita(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Despesas
            </h2>

            <div className="space-y-3">
              {despesas.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.descricao}
                    </p>

                    <p className="text-red-600 font-bold">
                      R$ {item.valor.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removerDespesa(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
