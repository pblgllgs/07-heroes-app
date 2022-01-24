import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

//creacion del mock para useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("pruebas en el <LoginScreen />", () => {
    //se crea un contexto
    const context = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };
    //se captura el componente montado: login
    const wrapper = mount(
        <AuthContext.Provider value={context}>
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    test("debe mostrarse correctamente", () => {
        //se compara con el snapshot
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de realizar el dispatch y la navegacion", () => {

        const handleClick = wrapper.find('button').prop('onClick');
        // se hace el dispatch
        handleClick();

        //se espera que se haga inicio de session y se manda las credenciales
        expect(context.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: "pblgllgs" },
        });

        //se espera una redirección a la ruta /marvel que es la por defecto al inicio de session
        expect(mockNavigate).toHaveBeenCalledWith("/marvel", { replace: true });

        //se almacena la ultima direccion en localstora
        localStorage.setItem("lastPath", "/dc");

        //se vuelve a autenticar, pero con datos en el localstorage
        handleClick();

        //se espera que se redirija a la ultima ruta almacenada en localstorage
        expect(mockNavigate).toHaveBeenCalledWith("/dc", { replace: true });
    });
});
