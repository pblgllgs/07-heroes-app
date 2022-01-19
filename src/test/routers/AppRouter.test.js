import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe("pruebas en <AppRouter />", () => {
    
    test("debe de mostrar el login si no esta autenticado", () => {
        //creamos un contexto que es de acceso publico
        const contextValue = {
            user: {
                logged: false,
            },
        };
        //capturamos el componente montado mandando el contexto
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        //se compara con el snapshot
        expect(wrapper).toMatchSnapshot();
        //se espera que exista un elemtento h1 con la frase login
        expect(wrapper.find("h1").text().trim()).toBe("Login");
    });
    test("debe de mostrar el componente de marvel si esta autenticado", () => {
        //se crea un contexto privado con un nombre
        const contextValue = {
            user: {
                name: "Pablo",
                logged: true,
            },
        };

        //capturamos el componente montado mandando el contexto
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        //se compara con el snapshot
        expect(wrapper).toMatchSnapshot();
        //se espera que el componente tenga un elemento navbar, mostrado solo en un contexto privado con credenciales aceptadas
        expect(wrapper.find(".navbar").exists()).toBeTruthy();
    });
});
