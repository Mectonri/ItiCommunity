import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseWord(word: string):  [string, MessageElement | null] {
    
    let messageElem: MessageElement | null = null;
    let content = word;

    const urlRegex = /(https|http)(:\/\/)(\w|\S)*/gm;
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|png|gif)/gmi;
     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = / /gmi;
     // TODO mp3,ogg,wav
    const audioRegex = / /gmi;
    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    

    if (urlRegex.test(word)) {
      content = `<a href=${word}>${word}</a>`;
    }
    if (pictureRegex.test(word)) {
      messageElem = {type: 'image', url: word.match(pictureRegex)![0]};
    }

    const videoMatche = videoRegex.exec(word)
    if (videoMatche) {
     // TODO ajouter un attachement de type video dans attachements

    }

    const audioMatche = audioRegex.exec(word)
    if (audioMatche) {
     // TODO ajouter un attachement de type audio dans attachements

    }

    const youtubeMatche = youtubeRegex.exec(word)
    if (youtubeMatche) {
     // TODO ajouter un attachement de type youtube dans attachements
    }

    return [content, messageElem];
  }


  private parseMessage(message: string): PostMessage {
    let attachements: MessageElement[] = [];
    let msgTextElement: MessageTextElement = {
      type: "text",
      content: ""
    }

    for (let word of message.split(" ")) {
      let [ctn, msgElem] = this.parseWord(word);
      msgTextElement.content += ctn + " ";
      msgElem !== null? attachements.push(msgElem!) : null;
    }

    return {
      text: msgTextElement,
      attachements
    };
  }
}
