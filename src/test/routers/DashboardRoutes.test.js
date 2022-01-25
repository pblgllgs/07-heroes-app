import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Pruebas en <DashboardRoutes />", () => {
    //creamos un contexto valido para rutas privadas
    const contextValue = {
        user: {
            name: "Pablo",
            logged: true,
        },
    };

    //MemoryRouter ayuda a proveer el useNAvigate
    test("Debe de mostrarse correctamente - Marvel", () => {
        //capturamos el componente montado, paramos el contexto
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        //comparamos con el snapshot
        expect(wrapper).toMatchSnapshot();
        //esperamos que dentro del componente se encuentre un elemento text-info con el valor de Pablo
        expect(wrapper.find(".text-info").text().trim()).toBe("Pablo");
        expect(wrapper.find("h1").text().trim()).toBe("Marvel Heroes");
    });

    test("Debe de mostrarse correctamente - DC", () => {
        //capturamos el componente montado, paramos el contexto
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/dc"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        console.log(wrapper.html());

        //comparamos con el snapshot
        expect(wrapper).toMatchSnapshot();
        //esperamos que dentro del componente se encuentre un elemento text-info con el valor de Pablo
        expect(wrapper.find(".text-info").text().trim()).toBe("Pablo");
        expect(wrapper.find("h1").text().trim()).toBe("DC Heroes");
    });
});
