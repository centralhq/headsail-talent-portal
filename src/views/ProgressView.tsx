import React, { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

enum CardContentType {
    PDF,
    LINK,
    ARTICLE
}

export interface CardContent {
    type: CardContentType,
    title: string,
    mainImage: ReactNode,
    description: string,
    content: string
}


type ProgressViewProps = {
    contentList: CardContent[]
}

const ProgressView: FC<ProgressViewProps & React.HTMLAttributes<HTMLDivElement>> = ({ contentList }) => {

    const cardItems: ReactNode[] = () => {
        const listItems = [];

        for (const content of contentList) {
            
            const main = content.content
            let mainHTML: ReactNode;

            switch (content.type) {
                case CardContentType.ARTICLE:

                    mainHTML = <ReactMarkdown>{main}</ReactMarkdown>

                case CardContentType.LINK:

                    mainHTML = (
                        <a href={main} target="_blank" rel="noopener noreferrer">
                            <h5></h5>
                        </a>
                    )

                case CardContentType.PDF:
                    

            }
                // if ARTICLE, main is rendered as markdown
                // if LINK, hyperlink to a new tab
                // if PDF, fetch content from URL

            listItems.push(
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    {content.mainImage}
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{content.title}</div>
                        <p className="text-gray-700 text-base">
                        {content.description}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
            )
        }
        
        return (

        )
        

    } 
        
    
    return (
        <div className="w-full h-full items-start content-start">
            <ul>

            </ul>
        </div>
    );
}