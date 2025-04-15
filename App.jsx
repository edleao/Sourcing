import AddProjectForm from './AddProjectForm.jsx'
import { supabase } from './supabaseClient.js'

export default function App() {
  const handleSubmit = async (formData) => {
    const { error } = await supabase.from("projects").insert([formData])
    if (error) {
      alert("Erro ao salvar: " + error.message)
    } else {
      alert("Projeto salvo com sucesso!")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sourcing Tracker</h1>
      <AddProjectForm onSubmit={handleSubmit} />
    </div>
  )
}
