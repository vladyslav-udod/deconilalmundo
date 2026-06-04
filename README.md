### Travel agency website project

This project is a travel agency website based in Conil, Spain. The website provides information about the various travel tours organized from Conil. Users can filter available tours by region, date and type. The website dynamically fetches content from Sanity CMS, allowing for easy updates and management of tour information, images, and other content.

## Tech Stack

- **Frontend Framework**: Next.js 15.3.2 with React 19.0.0
- **Styling**: styled-components 6.1.19
- **CMS**: Sanity 3.99.0 with next-sanity 9.12.0
- **Content Management**:
  - @sanity/client 7.12.0
  - @sanity/vision 3.99.0
  - @sanity/locale-es-es 1.2.34
- **Image Optimization**: @sanity/image-url 1.1.0
- **Rich Text Rendering**: @portabletext/react 3.1.0
- **DOM Rendering**: react-dom 19.0.0

## Features

- **Filters**: Users can filter available tours by region, date and type. Selected filters are stored in the URL query parameters, allowing for easy sharing of filtered results. Filter values displayed based on actual data from Sanity CMS, ensuring that users can only select valid options.
- **Dynamic Content**: The website dynamically fetches content from Sanity CMS, allowing for easy updates and management of tour information, images, and other content.
- **Responsive Design**: The website is designed to be responsive, providing an optimal viewing experience across a wide range of devices, from desktop computers to mobile phones.
