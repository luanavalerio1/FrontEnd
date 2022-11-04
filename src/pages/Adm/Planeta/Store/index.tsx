import { FormEvent, useEffect, useState } from "react";
import * as S from "./styles";
import { LoadingComponent, ButtonComponent } from "components";
import { FcDatabase, FcUndo } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiPlaneta } from "services/data";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IPlanetaForm } from "interfaces/planeta.interface";
import { IErrorResponse } from "interfaces/user.interface";

const PlanetaStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IPlanetaForm>({
    title: '',
    planeta: '',
    topic: []
  })
  const { id } = useParams<{ id: string }>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (Number(id) > 0) {
        await apiPlaneta.update(Number(id), formData);
        toast.success("Planeta alterada com sucesso!");
      } else {
        await apiPlaneta.store(formData);
        toast.success("Planeta cadastrada com sucesso!");
      }
      navigate('/adm/planeta')
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>
      let messages = err.response?.data.planeta
      if (err.response?.data.errors) {
        messages = err.response?.data.errors?.map((i) => i.planeta)
          .reduce((total, cur) => `${total} ${cur}`)
      }
      toast.error(messages)
    }
  }

  async function handleChange(e: IPlanetaForm) {
    setFormData((state: IPlanetaForm) => ({ ...state, ...e }))
  }

  async function handleCheck(e: string) {
    let topic: number[] = []
    if (formData.topic?.includes(Number(e))) {
      topic = formData.topic.filter((i) => i !== Number(e))
    } else {
      topic.push(Number(e))
    }
    setFormData((state: IPlanetaForm) => ({ ...state, topic }))
  }

  useEffect(() => {
    
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiPlaneta.show(id);
          setFormData({
            ...response.data,
           
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(Number(id));
    }
   
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <S.Main>
            <form method="POST" onSubmit={handleSubmit}>
              <Link to="/adm/planeta">
                <FcUndo /> Voltar
              </Link>
              <div>
                <label htmlFor="planeta">Nome: </label>
                <input type="text" id="planeta" placeholder="Escreva o nome" required
                  onChange={(e) => handleChange({ planeta: e.target.value })}
                  value={formData?.planeta}
                />
              </div>
              <div>
                <label htmlFor="planeta">Planeta: </label>
                <textarea id="planeta" placeholder="Escreva o nome do planeta" required
                  onChange={(e) => handleChange({ planeta: e.target.value })}
                  value={formData?.planeta}
                />
              </div>
              <div>
                <label htmlFor="planeta">Apelido: </label>
                <textarea id="planeta" placeholder="Escreva o apelido do planeta" required
                  onChange={(e) => handleChange({ planeta: e.target.value })}
                  value={formData?.planeta}
                />
              </div>
             
             
              <ButtonComponent bgColor="add" type="submit">
                Enviar <FcDatabase />
              </ButtonComponent>
            </form>
          </S.Main>
        </>
      )}
    </>
  );
};

export default PlanetaStore;