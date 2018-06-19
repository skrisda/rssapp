import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { FeedProvider, Feed } from '../../providers/feed/feed';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav : Nav;

  rootPage = 'FeedListPage';
  feeds: Feed[];
  constructor(private navController: NavController, private feedProvider: FeedProvider, public alertCtrl: AlertController) { }

  public addFeed() {
    let prompt = this.alertCtrl.create({
      title: 'Add Feed URL',
      inputs: [
        {
          name: 'name',
          placeholder: 'The best Feed ever'
        },
        {
          name: 'url',
          placeholder: 'http://www.myfeedurl.com/feed'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newFeed = new Feed(data.name, data.url);
            this.feedProvider.addFeed(newFeed).then(
              res => {
                this.loadFeeds();
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }
  private loadFeeds() {
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }
 
  public openFeed(feed: Feed) {
    this.nav.setRoot('FeedListPage', { 'selectedFeed': feed });
  }
 
  public ionViewWillEnter() {
    this.loadFeeds();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
