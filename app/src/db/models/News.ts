// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ database: 'default' })
@Index(['title', 'pubDate', 'link', 'reference'])
export class News {
    @PrimaryGeneratedColumn("uuid")
    news_id: number;

    @Column({
        type: "varchar",
        length: 1000,
        nullable: false,
        unique: false,
    })
    title: string;

    @Column({
        type: "text",
        default: "https://www.who.int/",
        nullable: false,
        unique: false,
    })
    link: string;

    @Column({
        type: "text",
        default: "https://www.vaccinenow.live/icone-image",
        nullable: true,
        unique: false,
    })
    urlToImage: string;

  @Column({
    type: 'text',
    default: '/logo-pic-resized.jpg',
    nullable: true,
    unique: false,
  })
  imageInLocalStorage: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  imageFileName: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  pubDate: Date;

    @Column({
        type: "text",
        nullable: true,
    })
    content: string;

    @Column({
        type: "varchar",
        length: 100,
        default: "who",
        nullable: false,
        unique: false,
    })
    reference: string;
}
