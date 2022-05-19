import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export interface IconProps {
    fill?: string;
}

export const AddIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M20 31.25q-.458 0-.75-.292-.292-.291-.292-.75v-9.166H9.792q-.459 0-.75-.292-.292-.292-.292-.75t.292-.75q.291-.292.75-.292h9.166V9.792q0-.459.292-.75.292-.292.75-.292t.75.292q.292.291.292.75v9.166h9.166q.459 0 .75.292.292.292.292.75t-.292.75q-.291.292-.75.292h-9.166v9.166q0 .459-.292.75-.292.292-.75.292Z" />
        </Svg>
    )
}
