import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'


const Header = () => {

    const [activeItem, setActiveItem] = useState('')

    const handleItemClick = (event, menuItem) => {
        console.log(event.target);
        console.log(menuItem.name);
        // setActiveItem(name);
    }
    return (
        <Menu style = {{marginTop : '10px' }}>
            <Menu.Item
                name='CrowdCoin'
                active={activeItem === 'CrowdCoin'}
                onClick={handleItemClick}
            >
                CrowdCoin
            </Menu.Item>

            
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Campaigns'
                    active={activeItem === 'Campaigns'}
                    onClick={handleItemClick}
                >
                    Campaigns
                </Menu.Item>

                <Menu.Item
                    name='plus'
                    active={activeItem === 'plus'}
                    onClick={handleItemClick}
                >
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header