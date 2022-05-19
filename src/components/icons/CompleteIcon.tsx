import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const CompleteIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M15.833 28.792q-.25 0-.479-.104-.229-.105-.437-.313L7.792 21.25q-.334-.333-.334-.771 0-.437.334-.771.333-.291.75-.291.416 0 .708.291l6.583 6.584 14.875-14.875q.334-.292.771-.292.438 0 .729.292.334.333.334.75 0 .416-.334.75L16.75 28.375q-.208.208-.438.313-.229.104-.479.104Z" />
        </Svg>
    )
}
