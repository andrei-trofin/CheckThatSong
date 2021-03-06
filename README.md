# CheckThatSong


This app keeps track of certain songs that the user marks as favorites.
When you don't have internet and you want to remember a song that you just heard and liked,
an app dedicated to this is probably better than a text editor. 
So basically there should exist a pre-built database with songs and artists 
through which the user could search and add to favorites or he/she has an option to add
them manually as [Artist] [SongTitle] and optionally [Album] [Genre] and [Year]. 
If the database will prove to be too complicated, manually adding songs will suffice.

As for the requirements part I thought of the following:

*Input form - [Artist] [SongTitle] and [Album] [Genre] [Year] [Lyrics] (required)  
*List of items - the list of favorite songs (songs that you added 
*Chart - how many songs belonging to each specific genre you have and   
	 how many songs you discovered per week  
*Authentication - every user should be able to authenticate in the app or by google/facebook  
*Offline support - only the favorite songs should be stored locally, so the search option   
		   (if there will exist) should be available only online  
*Online support - be able to listen to a certain song through a youtube link linked to this app (option: link can be added by admin)
		- use API(if can be found) or a website to find the song through the lyrics you have stored
*Intent - sent e-mail/message with some selected favorite songs to share with friends 
*Animations - pop-ups with achievements (e.g. you added your 5th song, Hooray! or you added your 100th song,  
	Get a life! and so on) 
			- these can be stored in each user's state when online/offline database is available
	(optional) alarms to remind you to check in the app  
*Optional - get a song recommendation when you open the app(Song of the day) or something   
	    which should be valid for the current session (o only if alreadylogged in)
  
Main feature will be to add song lyrics which can later be reviewed either by yourself or by the admin.
