import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

//creacion del mock para useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("pruebas en <HeroScreen />", () => {
    test("no debe de mostrar el HeroScreen si no hay un heroe en url", () => {
        //capturamos el componente montado
        const wrapper = mount(
            //no tenemos un heroe en el url
            <MemoryRouter initialEntries={["/hero"]}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        //esoeramos que al no tener un heroe en el url se muestre la pagina de no hero page
        expect(wrapper.find("h1").text().trim()).toBe("No Hero page");
    });

    test("debe de mostrar HeroScreen si el parametro existe y se encuentra", () => {
        //utilizamos un id existente
        const id = "marvel-spider";
        const wrapper = mount(
            //agregamos un heroe en el url
            <MemoryRouter initialEntries={[`/hero/${id}`]}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        //utilizamos el elemento img y sacamos su props de src
        const src = wrapper.find("img").prop("src");
        //esperamos que src de la imagen contenga el id del heroe
        expect(src).toContain(id);
    });

    test("debe de regresar a la pantalla anterior", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test("debe de mostrar el no hero page si no tenemos un heroe", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/CUALQUIER_COSA"]}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.text()).toBe("No Hero page");
    });
    
});
