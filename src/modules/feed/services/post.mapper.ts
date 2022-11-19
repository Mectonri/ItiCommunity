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
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;
    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;
    const mentionRegex = new RegExp('(?<=[^\w.-]|^)@([A-Za-z]+(?:\.\w+)*)$');
    

    if (urlRegex.test(word)) {
      content = `<a href=${word}>${word}</a>`;
    }
    if(mentionRegex.test(word)) {
      content = `<span class="user-mention">${word}</span>`
    }

    if (pictureRegex.test(word)) {
      messageElem = {type: "image", url: word.match(pictureRegex)![0]};
    }
    if (videoRegex.test(word)) {
      messageElem = {type: "video", url: word.match(videoRegex)![0]};
    }
    if (youtubeRegex.test(word)) {
      youtubeRegex.lastIndex = 0;
      messageElem = {type: "youtube", videoId: youtubeRegex.exec(word)![2]};
    }
    if (audioRegex.test(word)) {
      messageElem = {type: "audio", url: word.match(audioRegex)![0]};
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
