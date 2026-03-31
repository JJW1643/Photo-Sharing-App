import { View, Text, useWindowDimensions } from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { cloudinary } from '../lib/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { artisticFilter } from '@cloudinary/url-gen/actions/effect';

export default function Event() {
    const {width} = useWindowDimensions();
    return (
        <View>
            <Text className='text-white text-2xl font-bold'>Event Details</Text>
            <AdvancedImage
                cldImg={cloudinary.image('jr0wmublish2uempb2se').resize(
                    thumbnail()
                    .height(width * (4/3))
                    .width(width)
                ).effect(artisticFilter('incognito')) }
                className='w-200 aspect-[3/4]'
            />
        </View>
    );
}