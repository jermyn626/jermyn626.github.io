package main

import (
	// "encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

var StaticDir map[string]string

func main() {
	StaticDir = make(map[string]string)
	StaticDir["/dist"] = "/dist"
	http.Handle("/", http.HandlerFunc(staticHandler))
	http.HandleFunc("/index", getIndex)
	http.HandleFunc("/download", download)
	err := http.ListenAndServe(":9090", nil) // It will use defaultServerMux
	if err != nil {
		log.Fatal(err)
	}
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	fileType := strings.LastIndex(r.URL.Path, ".")
	if fileType < 0 {
		http.NotFound(w, r)
		return
	}

	//static file server
	for prefix, staticDir := range StaticDir {
		if strings.HasPrefix(r.URL.Path, prefix) {
			file := "." + staticDir + r.URL.Path[len(prefix):]
			// fmt.Println(file)
			http.ServeFile(w, r, file)
			// w.started = true
			return
		} else {
			http.NotFound(w, r)
		}
	}
}
func download(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Expires", "0")
	// w.Header().Set("Pragma", "No-cache")
	// w.Header().Set("Cache-Control", "No-cache")
	// w.Header().Set("Accept-Ranges", "bytes")
	// w.Header().Set("ContentType", "application/octet-stream")

	w.Header().Set("Content-Disposition", "attachment;filename=in.txt") // veryImportant!
	http.ServeFile(w, r, "./1.a")
}

// HandlerFunc for '/user'
// Response json of User struct
func getIndex(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("requestC: ----------")
	http.ServeFile(w, r, "./index.html")

	// fmt.Println("origin:", r.Referer())
	// // fmt.Println("pageSize:", r.FormValue("pageSize")) // Get query from request
	// // fmt.Println("webTitle:", r.FormValue("webTitle")) // Get query from request
	// fmt.Println("userAgent: " + r.UserAgent())
	// fmt.Println("requestMothod: " + r.Method)

	// type User struct {
	// 	UserId   string `json:"userId"`
	// 	UserName string `json:"userName"`
	// 	Do       string `json:"do"`
	// }
	// user := User{UserId: "2", UserName: "Steve Jobs", Do: "Apple"}
	// fmt.Println(user)
	// fmt.Println("----------------------------------------------")
	// userJson, err := json.Marshal(user)
	// if err != nil {
	// 	panic(err.Error())
	// }

	// w.Header().Set("Access-Control-Allow-Origin", "*") // cors

	// w.Write(userJson) // Response's body
}
