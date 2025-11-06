
import { Product, Category } from './types';
import { BeerIcon, WineIcon, ShotGlassIcon, SodaIcon, FoodIcon } from './components/Icons';

export const CATEGORIES: Category[] = ['Beer', 'Spirits', 'Wine', 'Soft Drinks', 'Misc'];

export const PRODUCTS: Product[] = [
    // Beer
    { id: 1, name: 'Heineken', price: 330, category: 'Beer', stock: 45, icon: BeerIcon },
    { id: 2, name: 'Hunters Gold Cider 330ml', price: 300, category: 'Beer', stock: 26, icon: BeerIcon },
    { id: 3, name: 'Guinness Kubwa', price: 300, category: 'Beer', stock: 76, icon: BeerIcon },
    { id: 4, name: 'PIlsner Lager 500ml', price: 250, category: 'Beer', stock: 24, icon: BeerIcon },
    { id: 5, name: 'Smirnoff Ice Black 300ml', price: 270, category: 'Beer', stock: 95, icon: BeerIcon },
    { id: 6, name: 'snapp', price: 270, category: 'Beer', stock: 29, icon: BeerIcon },
    { id: 7, name: 'Tusker Cider 500ml', price: 300, category: 'Beer', stock: 38, icon: BeerIcon },
    { id: 8, name: 'Tusker Lager 500ml', price: 250, category: 'Beer', stock: 114, icon: BeerIcon },
    { id: 9, name: 'Tusker Lite', price: 270, category: 'Beer', stock: 81, icon: BeerIcon },
    { id: 10, name: 'Tusker Malt 300ml', price: 250, category: 'Beer', stock: 46, icon: BeerIcon },
    { id: 11, name: 'White Cap 500ml', price: 280, category: 'Beer', stock: 109, icon: BeerIcon },
    { id: 12, name: 'White Cap Light 500ml', price: 270, category: 'Beer', stock: 5, icon: BeerIcon },
    { id: 13, name: 'Balozi', price: 250, category: 'Beer', stock: 93, icon: BeerIcon },
    { id: 14, name: 'Kenya Originals', price: 300, category: 'Beer', stock: 21, icon: BeerIcon },
    { id: 15, name: 'Guiness can', price: 350, category: 'Beer', stock: 10, icon: BeerIcon },
    { id: 16, name: 'Tusker Lite can', price: 350, category: 'Beer', stock: 11, icon: BeerIcon },
    { id: 17, name: 'Smirnoff ice Guarana', price: 300, category: 'Beer', stock: 8, icon: BeerIcon },
    { id: 18, name: 'Black Ice Can', price: 300, category: 'Beer', stock: 16, icon: BeerIcon },
    { id: 19, name: 'Tusker Cider can', price: 350, category: 'Beer', stock: 12, icon: BeerIcon },
    { id: 20, name: 'White Cap can', price: 350, category: 'Beer', stock: 10, icon: BeerIcon },
    { id: 21, name: 'Balozi can', price: 300, category: 'Beer', stock: 5, icon: BeerIcon },
    { id: 22, name: 'Monster can', price: 350, category: 'Beer', stock: 0, icon: BeerIcon },
    
    // Soft Drinks
    { id: 23, name: 'Soda', price: 100, category: 'Soft Drinks', stock: 216, icon: SodaIcon },
    { id: 24, name: 'dasani', price: 150, category: 'Soft Drinks', stock: 62, icon: SodaIcon },
    { id: 25, name: 'Keringet 1 litre', price: 160, category: 'Soft Drinks', stock: 50, icon: SodaIcon },
    { id: 26, name: 'keringet 500ml', price: 100, category: 'Soft Drinks', stock: 27, icon: SodaIcon },
    { id: 27, name: 'Delmonte 1l', price: 350, category: 'Soft Drinks', stock: 63, icon: SodaIcon },
    { id: 28, name: 'Red Bull 250ml', price: 300, category: 'Soft Drinks', stock: 42, icon: SodaIcon },
    { id: 29, name: '1759 spiral water', price: 150, category: 'Soft Drinks', stock: 48, icon: SodaIcon },
    
    // Wine
    { id: 30, name: 'Cellar Cask White 750ml', price: 1500, category: 'Wine', stock: 3, icon: WineIcon },
    { id: 31, name: 'Nederberg chardon', price: 2500, category: 'Wine', stock: 0, icon: WineIcon },
    { id: 32, name: '4TH STREET RED (Glass)', price: 250, category: 'Wine', stock: 16, icon: WineIcon },
    { id: 33, name: 'CELLER CASK RED (Glass)', price: 250, category: 'Wine', stock: 2, icon: WineIcon },
    { id: 34, name: 'DROSTY HOF RED (Glass)', price: 250, category: 'Wine', stock: 10, icon: WineIcon },
    { id: 35, name: '4TH street red 750ml', price: 1500, category: 'Wine', stock: 5, icon: WineIcon },
    { id: 36, name: '4th street white 750ml', price: 1500, category: 'Wine', stock: 13, icon: WineIcon },
    { id: 37, name: 'Asconi Pastoral 750 ml', price: 2500, category: 'Wine', stock: 5, icon: WineIcon },
    { id: 38, name: 'Caprice sweet red 1ltr', price: 1200, category: 'Wine', stock: 7, icon: WineIcon },
    { id: 39, name: 'Caprice sweet white 1ltr', price: 1200, category: 'Wine', stock: 4, icon: WineIcon },
    { id: 40, name: 'Cellar Cask Red 750ml', price: 1500, category: 'Wine', stock: 4, icon: WineIcon },
    { id: 41, name: 'Drosty hof white 750ml', price: 1500, category: 'Wine', stock: 8, icon: WineIcon },
    { id: 42, name: 'Drosy hof red 750ml', price: 1500, category: 'Wine', stock: 4, icon: WineIcon },
    { id: 43, name: 'Four Cousins red 750ml', price: 1500, category: 'Wine', stock: 7, icon: WineIcon },
    { id: 44, name: 'Four Cousins White 750ml', price: 1500, category: 'Wine', stock: 10, icon: WineIcon },
    { id: 45, name: 'Nederberg Pinotage 750ml', price: 2500, category: 'Wine', stock: 2, icon: WineIcon },
    { id: 46, name: 'Nederberg Shiraz RED', price: 2500, category: 'Wine', stock: 2, icon: WineIcon },
    { id: 47, name: 'Robertson Red 750ml', price: 2000, category: 'Wine', stock: 2, icon: WineIcon },
    { id: 48, name: 'Robertson White 750ml', price: 2000, category: 'Wine', stock: 4, icon: WineIcon },

    // Spirits
    { id: 49, name: 'Ballantine 750ML', price: 3000, category: 'Spirits', stock: 0, icon: ShotGlassIcon },
    { id: 50, name: 'Bond 7 375ml', price: 1000, category: 'Spirits', stock: 3, icon: ShotGlassIcon },
    { id: 51, name: 'Bond 7 750ml', price: 2000, category: 'Spirits', stock: 1, icon: ShotGlassIcon },
    { id: 52, name: 'Grants 750ml', price: 3000, category: 'Spirits', stock: 0, icon: ShotGlassIcon },
    { id: 53, name: 'Jack daniels 1l', price: 6000, category: 'Spirits', stock: 2, icon: ShotGlassIcon },
    { id: 54, name: 'Jack daniels 700ml', price: 4500, category: 'Spirits', stock: 7, icon: ShotGlassIcon },
    { id: 55, name: 'Jameson 750ml', price: 4000, category: 'Spirits', stock: 3, icon: ShotGlassIcon },
    { id: 56, name: 'J/walker black 750ml', price: 4500, category: 'Spirits', stock: 4, icon: ShotGlassIcon },
    { id: 57, name: 'J/walker red 750ml', price: 3500, category: 'Spirits', stock: 3, icon: ShotGlassIcon },
    { id: 58, name: 'vat 69 375ml', price: 1500, category: 'Spirits', stock: 6, icon: ShotGlassIcon },
    { id: 59, name: 'william lawson 1l', price: 3000, category: 'Spirits', stock: 1, icon: ShotGlassIcon },
    { id: 60, name: 'Southern comfort 1 litre', price: 4500, category: 'Spirits', stock: 2, icon: ShotGlassIcon },
    { id: 61, name: 'viceroy 375ml', price: 1500, category: 'Spirits', stock: 4, icon: ShotGlassIcon },
    { id: 62, name: 'viceroy 750ml', price: 2500, category: 'Spirits', stock: 6, icon: ShotGlassIcon },
    { id: 63, name: 'martel vs 700ml', price: 8000, category: 'Spirits', stock: 1, icon: ShotGlassIcon },
    { id: 64, name: 'CAPTAIN GOLD 750ML', price: 2300, category: 'Spirits', stock: 1, icon: ShotGlassIcon },
    { id: 65, name: 'Jose quervo gold 750ml', price: 3800, category: 'Spirits', stock: 0, icon: ShotGlassIcon },
    { id: 66, name: 'smirnoff vodka red 375ml', price: 1200, category: 'Spirits', stock: 3, icon: ShotGlassIcon },
    
    // Misc
    { id: 67, name: 'Eno', price: 20, category: 'Misc', stock: 18, icon: FoodIcon },
];
