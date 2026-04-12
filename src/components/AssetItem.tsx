import { Text } from 'react-native';
import { Tables } from '../types/database.types';
import { AdvancedImage } from 'cloudinary-react-native';
import { cloudinary } from '../lib/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { artisticFilter } from '@cloudinary/url-gen/actions/effect';
import { useWindowDimensions } from 'react-native';

// The AssetItem component is a simple functional component that takes an asset as a prop and renders an image using the AdvancedImage component from cloudinary-react-native. The image is transformed using the thumbnail and artisticFilter transformations from Cloudinary to create a nice thumbnail of the asset. The width of the image is set to the width of the device screen, and the height is set to maintain a 4:3 aspect ratio.

export default function AssetItem({ asset }: { asset: Tables<'assets'> }) {

    const {width} = useWindowDimensions();

    return (
        <AdvancedImage
                cldImg={cloudinary
                .image(asset.asset_id!)
                .resize(
                    thumbnail()
                        .height((width * (4 / 3))/2)
                        .width(width / 2)
                    )
                    .effect(artisticFilter('incognito'))}
                className='flex-1 max-w-[50%] w-full aspect-[3/4] rounded-lg'
            />
    );
}