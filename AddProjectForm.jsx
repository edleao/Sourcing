import { useState } from "react";

export default function AddProjectForm({ onSubmit }) {
  const [form, setForm] = useState({
    project: "",
    requisition: "",
    contractOrOrder: "",
    entity: "",
    responsible: "",
    stakeholder: "",
    currency: "BRL",
    description: "",
    budgetType: "",
    purchaseType: "",
    category: "",
    progress: "",
    stage: "",
    startDate: "",
    planningDate: "",
    endDate: "",
    suppliers: [{ name: "", winner: false }],
    savingsType: "",
    budget: "",
    baseline: "",
    pmp: "",
    ump: "",
    oldPaymentDays: "",
    newPaymentDays: "",
    contractStart: "",
    contractEnd: "",
    comments: "",
    attachments: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }));
  };

  const handleSupplierChange = (index, field, value) => {
    const newSuppliers = [...form.suppliers];
    newSuppliers[index][field] = field === "winner" ? value.target.checked : value.target.value;
    setForm((prev) => ({ ...prev, suppliers: newSuppliers }));
  };

  const addSupplier = () => {
    setForm((prev) => ({ ...prev, suppliers: [...prev.suppliers, { name: "", winner: false }] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.project || !form.entity || !form.responsible || !form.currency || !form.description) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.progress === "Finish") {
      const hasWinner = form.suppliers.some((s) => s.winner);
      if (!hasWinner) {
        alert("Selecione ao menos um fornecedor vencedor ao finalizar o projeto.");
        return;
      }
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <fieldset className="border p-4 rounded">
        <legend className="font-bold">Fornecedores</legend>
        {form.suppliers.map((supplier, index) => (
          <div key={index} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="Fornecedor"
              value={supplier.name}
              onChange={(e) => handleSupplierChange(index, "name", e)}
              className="flex-1 p-2 border rounded"
            />
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={supplier.winner}
                onChange={(e) => handleSupplierChange(index, "winner", e)}
              />
              Vencedor
            </label>
          </div>
        ))}
        <button type="button" onClick={addSupplier} className="text-sm text-blue-600">+ Adicionar Fornecedor</button>
      </fieldset>
    </form>
  );
}
