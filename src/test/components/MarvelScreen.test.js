const { shallow } = require("enzyme");
const { MarvelScreen } = require("../../components/marvel/MarvelScreen");

describe('pruebas en <MarvelScreen />', () => {
    test('comparar con snapshot', () => {
        const wrapper = shallow(<MarvelScreen />)
        expect(wrapper).toMatchSnapshot();
    })
})
