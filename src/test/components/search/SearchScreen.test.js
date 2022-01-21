import { SearchScreen } from "../../../components/search/SearchScreen";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

//creacion de un mock para simular el uso de navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Pruebas en <SearchScreen />", () => {
    test("debe mostrarse correctamente con valores por defecto", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe(
            "Acá se mostrarán las coincidencias"
        );
    });

    test("debe mostrarse correctamente a batman y el input del queryString", () => {
        //capturamos el componente montado
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchScreen />
            </MemoryRouter>
        );
        //se compara con el snapshot
        expect(wrapper).toMatchSnapshot();
        //se espera que el valor del item input sea batman
        expect(wrapper.find("input").prop("value")).toBe("batman");
        //se espera que el valor del item dentro de card-title sea Batman
        expect(wrapper.find(".card-title").text().trim()).toBe("Batman");
    });

    test("debe mostrarse el error con el valor batman123 y el input del queryString debe ser 123", () => {
        //capturamos el componente montado
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <SearchScreen />
            </MemoryRouter>
        );
        //se compara con el snapshot
        expect(wrapper).toMatchSnapshot();
        //se espera que el valor del item input sea batman
        expect(wrapper.find("input").prop("value")).toBe("batman123");
        //se espera que el valor del item dentro de card-title sea Batman
        expect(wrapper.find(".alert-danger").text().trim()).toBe(
            "No hay resultados para batman123"
        );
    });

    test("debe de llamar el navigate a la nueva pantalla", () => {
        //capturamos el componente montado
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchScreen />
            </MemoryRouter>
        );
        //se simula el cambio del formulario con el valor de batman
        wrapper.find("input").simulate("change", {
            target: {
                name: "searchText",
                value: "batman",
            },
        });
        //se simula el posteo del form
        wrapper.find("form").prop("onSubmit")({
            preventDefault() {},
        });
        //se espera que el navigate se haga con el valor enviado en el target
        expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
    });
});
