import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';


const Header = () => {

    const [activeItem, setActiveItem] = useState('')
    const router = useRouter();
    const handleItemClick = (event, menuItem) => {
        console.log(event.target);
        console.log(menuItem.name);
        router.push("/campaigns/new");
    }
    return (
        <Menu style = {{marginTop : '10px' }}>
            <Menu.Item
                name='CrowdCoin'
                active={activeItem === 'CrowdCoin'}
            >
                CrowdCoin
            </Menu.Item>

            
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Campaigns'
                    active={activeItem === 'Campaigns'}
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