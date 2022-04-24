import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news = [];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();
  }
  getAllNews() {
    this.newsService.getAllItems().subscribe( data => {
      this.news = data;
      console.log("news: ", this.news);
    });
  }
}
