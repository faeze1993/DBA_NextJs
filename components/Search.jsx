import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { FileText, Search, UserCheck, X } from 'react-feather';
import { useSelector } from "react-redux";
import { GetArticlesForArchiveBySearch } from "../services/articleService";
import { useRouter } from 'next/navigation';

const SearchTool = () => {

  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const searchValue = useSelector(state => state.searchValue)
  useEffect(() => {
    setValue(searchValue);
    handleChange(searchValue);
  }, [searchValue])

  const handleChange = (text) => {
    const query = text.toLowerCase();
    setValue(query);
    if (query.length > 1) {

      setTimeout(() => {
        searchOnText(query);
      }, "1000")


    } else {
      setSuggestionsActive(false);
    }
  };

  const searchOnText = async (text) => {
    const { data } = await GetArticlesForArchiveBySearch(text);

    const filterSuggestions = data;
    setSuggestions(filterSuggestions);
    setSuggestionsActive(true);

  };

  const handleClick = (item) => {
    setSuggestions([]);
    setValue(item.Name);
    setSuggestionsActive(false);
    router.push(`/article/${item.Id}/${item.Name.replace(" ","_").replace(/ /g, "_")}`)
  };

  const handleRemoveSearchValue = () => {
    setSuggestions([]);
    setValue("");
    setSuggestionsActive(false);
  }



  document.addEventListener('click', function (event) {
    setSuggestionsActive(false);
  });



  const Suggestions = () => {

    //#region up/down key
    const scrollRef = useRef(null);
    const handleUpDownKey = () => {
      // Get all the <li> elements into a collection
      var listItems = document.querySelectorAll(".suggestions_ul li");
      if (listItems.length > 0) {
        // console.info("listItems", listItems);
        // Set up a counter to keep track of which <li> is selected
        var currentLI = 0;

        // Initialize first li as the selected (focused) one:
        listItems[currentLI].classList.add("highlight_suggestionli");

        // Set up a key event handler for the document
        document.addEventListener("keydown", function (event) {

          // Check for up/down key presses
          switch (event.keyCode) {
            case 38: // Up arrow    
              // Remove the highlighting from the previous element
              listItems[currentLI].classList.remove("highlight_suggestionli");

              currentLI = currentLI > 0 ? --currentLI : 0;     // Decrease the counter      
              listItems[currentLI].classList.add("highlight_suggestionli"); // Highlight the new element
              scrollRef.current.scrollBy(0, -30);
              break;
            case 40: // Down arrow
              // Remove the highlighting from the previous element
              listItems[currentLI].classList.remove("highlight_suggestionli");

              currentLI = currentLI < listItems.length - 1 ? ++currentLI : listItems.length - 1; // Increase counter 
              listItems[currentLI].classList.add("highlight_suggestionli");       // Highlight the new element
              // console.info(" listItems[currentLI].clientHeight",listItems[currentLI].clientHeight)
              // console.info(" listItems[currentLI].clientHeight",listItems[currentLI].clientTop)
              // console.info("scrollRef.current.clientHeight", scrollRef.current.clientHeight)
              // console.info("scrollRef.current.scrollHeight ", scrollRef.current.scrollHeight)
              // console.info("scrollRef.current.scrollTop  ", scrollRef.current.scrollTop)
              // const bottom = scrollRef.current.scrollHeight - scrollRef.current.scrollTop === scrollRef.current.clientHeight;
              // if (bottom) { 
              scrollRef.current.scrollBy(0, 30)
              // }
            
              break;
            case 13: // Down Enter
              // select


              setValue(listItems[currentLI].attributes.name.value);
              router.push(`/article/${listItems[currentLI].id}/${listItems[currentLI].attributes.name.value.replace(" ","_").replace(/ /g, "_")}`);
              setSuggestionsActive(false);
              setSuggestions([]);
              break;
          }
        });
      };
    }

    //#endregion

    useEffect(() => {
      handleUpDownKey();
    }, [])



    return (
      <div className="suggestions" ref={scrollRef}>
        <ul className="suggestions_ul p-2 d-grid m-0" role="listbox" tabIndex="0" ref={scrollRef}>
          {suggestions.length > 0 ? suggestions.map((suggestion) => {
            return (
              <li
                tabIndex="-1"
                role="option"
                className="px-1 py-2 d-flex"
                id={suggestion.Id}
                name={suggestion.Name}
                key={suggestion.Id}
                onClick={e => handleClick(suggestion)}
                onkeydown="return handleKeyDown();"
              >
                <div className="col">
                  <span className="d-block"><FileText className="pe-1" />{suggestion.Name}</span>
                  <span className="breadcrumb-span">{suggestion.Breadcrumbs}</span>
                </div>
                <div className="col-3 d-none d-sm-block"><UserCheck className="pe-1" />{suggestion.AuthorName}</div>

              </li>
            );
          }) : <div className="text-center">نتیجه ای یافت نشد!</div>}
        </ul>
      </div>

    );
  };

  return (
    <div className="search-form">
      <span className="search-icon">
        <Search color="rgb(39 103 169)" />
      </span>
      <input id="searchinput" type="text" placeholder="جست و جو ..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {suggestionsActive &&
        <span className="remove-icon" onClick={handleRemoveSearchValue}>
          <X />
        </span>
      }

      {suggestionsActive && <Suggestions />}

    </div>
  )
}

export default SearchTool;


