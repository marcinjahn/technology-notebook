(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{424:function(e,t,a){"use strict";a.r(t);var s=a(31),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[e._v("#")]),e._v(" Git")]),e._v(" "),a("h2",{attrs:{id:"useful-tips"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#useful-tips"}},[e._v("#")]),e._v(" Useful Tips")]),e._v(" "),a("ul",[a("li",[e._v("when working on a feature branch, it's a good idea to rebase on top of latest\nversion of source branch to keep the history of feature branch clean (without\nmerges) ("),a("code",[e._v("git rebase develop")]),e._v("). "),a("code",[e._v("git pull --rebase")]),e._v(" is useful in the above\nsituation. It automates the whole thing.")]),e._v(" "),a("li",[e._v("Git is able to automatically understand that some file got renamed, without an\nexplicit "),a("code",[e._v("git mv")])]),e._v(" "),a("li",[a("code",[e._v("git mv")]),e._v(" automatically adds a change to the Staging Area (index).")]),e._v(" "),a("li",[a("code",[e._v("git rebase -i")]),e._v(" is powerful - the commits can be reordered!")]),e._v(" "),a("li",[e._v("if something goes wrong during a rebase, we can recover our previous state by\nmoving the branch to the previous HEAD ("),a("code",[e._v("git reflog HEAD")]),e._v(" might help to find\nthe SHA-1 of the old HEAD commit), before it's garbage collected")])]),e._v(" "),a("h3",{attrs:{id:"commit-targetting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commit-targetting"}},[e._v("#")]),e._v(" Commit Targetting")]),e._v(" "),a("p",[e._v("Useful for "),a("code",[e._v("git show <COMMIT>")]),e._v(":")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("HEAD^")]),e._v(" - parent")]),e._v(" "),a("li",[a("code",[e._v("HEAD^^")]),e._v(" - parent of the parent")]),e._v(" "),a("li",[a("code",[e._v("HEAD~3")]),e._v(" - 3rd commit behind "),a("code",[e._v("HEAD")]),e._v(" ("),a("code",[e._v("HEAD~0")]),e._v(" = "),a("code",[e._v("HEAD")]),e._v(")")]),e._v(" "),a("li",[a("code",[e._v("HEAD~2^2")]),e._v(" - if the 2nd commit behind HEAD is a merge commit, it has 2\nparents. This is how we refer to the second parent.")])]),e._v(" "),a("h2",{attrs:{id:"cheat-sheet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cheat-sheet"}},[e._v("#")]),e._v(" Cheat Sheet")]),e._v(" "),a("p",[e._v("https://cheatography.com/loreno10/cheat-sheets/git/")]),e._v(" "),a("h2",{attrs:{id:"function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#function"}},[e._v("#")]),e._v(" Function")]),e._v(" "),a("p",[e._v("Git can be seen as a set of layers:")]),e._v(" "),a("h4",{attrs:{id:"persistent-key-value-map"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#persistent-key-value-map"}},[e._v("#")]),e._v(" Persistent key-value map")]),e._v(" "),a("p",[e._v("Git stores objects. Key is SHA-1, and the value is the contents.")]),e._v(" "),a("h4",{attrs:{id:"content-tracker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#content-tracker"}},[e._v("#")]),e._v(" Content tracker")]),e._v(" "),a("p",[e._v('Each commit is a point in the history. Git creates a kind of file system built\nwith objects. Different commits point to a different "shape" of our repository.')]),e._v(" "),a("h2",{attrs:{id:"internals"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#internals"}},[e._v("#")]),e._v(" Internals")]),e._v(" "),a("h3",{attrs:{id:"objects"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#objects"}},[e._v("#")]),e._v(" Objects")]),e._v(" "),a("p",[a("code",[e._v(".git/objects")]),e._v(" folder is a database of all Git objects.")]),e._v(" "),a("p",[e._v("There are 4 types of objects in Git:")]),e._v(" "),a("ul",[a("li",[e._v("blobs")]),e._v(" "),a("li",[e._v("trees")]),e._v(" "),a("li",[e._v("commits")]),e._v(" "),a("li",[e._v("annotated tags")])]),e._v(" "),a("p",[e._v("Every object in Git has its SHA-1.")]),e._v(" "),a("p",[e._v("In example, if a commit is created, a new file is created in "),a("code",[e._v(".git/objects")]),e._v("\n(name is the same as commit's SHA-1):")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("tree 4e9e0b052b2f0c5aaeabd215eacbb62c6ea299bf\nauthor Marcin Jahn <marcin.jahn@pl.abb.com> 1607885340 +0100\ncommitter Marcin Jahn <marcin.jahn@pl.abb.com> 1607885340 +0100\n\nFirst commit\n")])])]),a("p",[e._v("It contains a basic info about a commit, including the SHA-1 of a "),a("strong",[e._v("tree")]),e._v(" - a\ndirectory object in Git. If the commit was not first in history, there would\nalso be a "),a("em",[e._v("parent")]),e._v(" information (SHA-1 of a parent commit(s)). If we look at the\ncontents of the tree object (with "),a("code",[e._v("git cat-file -p 4e9e0b052b2f0c5aaeabd215eacbb62c6ea299bf")]),e._v(") we'd get:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("100644 blob 8954f2439cae536b9b35ac39e8d173b90f979ca4  menu.txt\n040000 tree c888eb2c751094817564e75b0f32fb366e719607  recipes\n\n")])])]),a("p",[e._v("The root folder of our repo contains two things: "),a("code",[e._v("menu.txt")]),e._v(" and "),a("code",[e._v("recipes")]),e._v("\ndirectory. These 2 are shown above. "),a("strong",[e._v("Blob")]),e._v(" is an object that represents a\nfile. Contents of "),a("code",[e._v("menu.txt")]),e._v(" blob:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Put your recipes here\n")])])]),a("p",[e._v("This is exactly the same content as the file in our repo. Blobs store just the\ncontents of the file. They do not store file's name or its permissions. These\nare stored in the tree that points to that blob.")]),e._v(" "),a("blockquote",[a("p",[e._v("The commit points to a tree object, which represents the state of the repo for\nthis commit. A tree than points to its contents: files (blobs) and directories\n(trees).")])]),e._v(" "),a("p",[e._v("If there were 2 different files with the same content, just one object would be\ncreated. It would be pointed to twice (by different trees, if different\ndirectories contained these files).")]),e._v(" "),a("p",[e._v("An example of Git objects:")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/6UiOGry.png",alt:"Git Object Model Example(source:Pluralsight)"}})]),e._v(" "),a("p",[e._v("There are 2 commits (red). In the last commit, one file ("),a("code",[e._v("menu.txt")]),e._v(") was\nmodified. Because of that, a new object was created for that new state of this\nfile. Since the "),a("code",[e._v("recipes")]),e._v(" directory stayed the same, both commits point to the\nsame object.")]),e._v(" "),a("p",[e._v("Git might also, for optimization, work a bit differently if files are big. When\nwe change just a line of such a file, Git will store only the difference,\ninstead of copying the entire file into a new blob object. However, for\nsimplicity, it can be ignored.")]),e._v(" "),a("p",[e._v("After cloning a project from a remote, the "),a("code",[e._v("objects")]),e._v(' directory will not contain\nthe individual objects. Instead, there will be a "pack" containing all the\nobjects.')]),e._v(" "),a("h4",{attrs:{id:"branches"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#branches"}},[e._v("#")]),e._v(" Branches")]),e._v(" "),a("p",[e._v("Branches are stored in "),a("code",[e._v(".git/refs/heads")]),e._v(". Each branch has its file, and contains\njust the SHA-1 of the commit it points to. A branch is just a reference to some\ncommit.")]),e._v(" "),a("h4",{attrs:{id:"internal-commands"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#internal-commands"}},[e._v("#")]),e._v(" Internal Commands")]),e._v(" "),a("p",[a("code",[e._v("git cat-file -p <SHA-1 of an object>")]),e._v(" - displays the object's content "),a("code",[e._v("git count-objects")]),e._v(" - show how many objects there are in the repo")]),e._v(" "),a("h4",{attrs:{id:"uniqueness"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uniqueness"}},[e._v("#")]),e._v(" Uniqueness")]),e._v(" "),a("p",[e._v("SHA-1 of a commit is unique globally. There might be collision, but the chance\nfor that is very low. The SHA-1 of blobs or trees is not unique, because it is\ndependent on the file contents only. Commit's SHA-1 depends from the author,\ntimestamp.")]),e._v(" "),a("h4",{attrs:{id:"merge-files"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#merge-files"}},[e._v("#")]),e._v(" Merge files")]),e._v(" "),a("p",[e._v("When there's an ongoing merge (i.e., conflict), "),a("code",[e._v(".git")]),e._v(" directory will contain\nsome "),a("code",[e._v("MERGING_*")]),e._v(" files, which inform what we are merging.")]),e._v(" "),a("h3",{attrs:{id:"head-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#head-file"}},[e._v("#")]),e._v(" HEAD file")]),e._v(" "),a("p",[a("code",[e._v(".git/HEAD")]),e._v(" contains the path to the current branch, i.e. "),a("code",[e._v("ref: refs/heads/master")]),e._v(". HEAD is a reference to a branch. When checking out another\nbranch, the only thing that changes is the content of the "),a("code",[e._v(".git/HEAD")]),e._v(" file.")]),e._v(" "),a("p",[e._v('If we checkout a commit ("detached" HEAD), instead of a branch, '),a("code",[e._v(".git/HEAD")]),e._v(" will\ncontain the SHA-1 of that commit.")]),e._v(" "),a("h4",{attrs:{id:"detached-head"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#detached-head"}},[e._v("#")]),e._v(" Detached HEAD")]),e._v(" "),a("p",[e._v("We can still commit in the detached state. If we then switch back to some\nbranch, these comits will be unreachable. After some time Git will remove them\nfrom the "),a("code",[e._v("objects")]),e._v(" database. We can still use these commits until that happens.")]),e._v(" "),a("h3",{attrs:{id:"index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#index"}},[e._v("#")]),e._v(" Index")]),e._v(" "),a("p",[a("code",[e._v(".git/index")]),e._v(" contains "),a("strong",[e._v("Staging Area")]),e._v(" changes. It's a binary file, the content\nis not readable.")]),e._v(" "),a("h2",{attrs:{id:"rebase"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rebase"}},[e._v("#")]),e._v(" Rebase")]),e._v(" "),a("p",[e._v("Rebase moves commits around. It can do a fast-forward, just like "),a("code",[e._v("merge")]),e._v(". I.e.,\nin this case, "),a("code",[e._v("git rebase spaghetti")]),e._v(" and "),a("code",[e._v("git merge spaghetti")]),e._v(' will have the\nsame result - "master" will be moved to "spaghetti" commit.\n'),a("img",{attrs:{src:"https://i.imgur.com/eUeRo82.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"commits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commits"}},[e._v("#")]),e._v(" Commits")]),e._v(" "),a("p",[e._v("When rebasing commits, NEW commits are created that are mostly the same as the\noriginal ones. Parents change, and this changes the SHA-1 - new objects will be\ncreated as a result. The original commits will be deleted at some point from the\n"),a("code",[e._v("objects")]),e._v(" database by Git (garbage collection).")]),e._v(" "),a("h2",{attrs:{id:"tags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tags"}},[e._v("#")]),e._v(" Tags")]),e._v(" "),a("p",[e._v('There are "normal" and "annotated" tags. Tags are similar to branches, with one\ndifference - branches move with commits, tags do not move.')]),e._v(" "),a("h3",{attrs:{id:"normal-tags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#normal-tags"}},[e._v("#")]),e._v(" Normal tags")]),e._v(" "),a("p",[e._v("They are just like a label. They are stored in "),a("code",[e._v(".git/refs/tags")]),e._v(" and contain just\nthe SHA-1 of the commit that they point to. Such a tag could easily be\ntransformed in to a branch, just by moving it to "),a("code",[e._v(".git/refs/heads")]),e._v(", where all\nbranches are stored.")]),e._v(" "),a("h3",{attrs:{id:"annotated-tags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#annotated-tags"}},[e._v("#")]),e._v(" Annotated tags")]),e._v(" "),a("p",[e._v("They contain more information - a date, an author, a description. They are\nstored as an object.")]),e._v(" "),a("h2",{attrs:{id:"remotes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remotes"}},[e._v("#")]),e._v(" Remotes")]),e._v(" "),a("p",[a("code",[e._v(".git/config")]),e._v(" contains the remotes configuration.")]),e._v(" "),a("h3",{attrs:{id:"pull"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pull"}},[e._v("#")]),e._v(" Pull")]),e._v(" "),a("p",[a("code",[e._v("git pull")]),e._v(" is a combination of "),a("code",[e._v("git fetch")]),e._v(" and "),a("code",[e._v("git merge")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"adding-a-part-of-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-part-of-file"}},[e._v("#")]),e._v(" Adding a part of file")]),e._v(" "),a("p",[e._v("It might happen that we modify a few lines of a file, but we do not want to add\nall of it to the commit. We want to add just a part of these changes. "),a("code",[e._v("git add -p <file>")]),e._v(" does that. It splits the file into "),a("strong",[e._v("hunks")]),e._v(". Git asks about each\nhunk and we have to decide to include it ("),a("code",[e._v("y")]),e._v(") or not ("),a("code",[e._v("n")]),e._v("). We might also\ndecide to split the hunk into a smaller one ("),a("code",[e._v("s")]),e._v(") and decide for each of the\nsmaller hunks separately. After it's done, we may commit.")]),e._v(" "),a("p",[a("code",[e._v("-p")]),e._v(" = "),a("code",[e._v("--patch")])]),e._v(" "),a("p",[e._v("A few other git commands have the "),a("code",[e._v("--patch")]),e._v(" option: "),a("code",[e._v("add")]),e._v(", "),a("code",[e._v("checkout")]),e._v(", "),a("code",[e._v("stash")]),e._v(",\n"),a("code",[e._v("reset")]),e._v(", ...")]),e._v(" "),a("h2",{attrs:{id:"useful-commands"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#useful-commands"}},[e._v("#")]),e._v(" Useful Commands")]),e._v(" "),a("p",[a("code",[e._v("git reflog")]),e._v(" - show the log of things happening in the repo (switching branches,\nnew commits, rebases, etc.) "),a("code",[e._v("git reflog HEAD")]),e._v(" - show the log of where "),a("code",[e._v("HEAD")]),e._v(" was\n"),a("code",[e._v("git show <SHA-1>")]),e._v(" - show any file by its SHA-1 "),a("code",[e._v('git config --global --replace-all core.pager "less -iXFR"')]),e._v(" - displays "),a("code",[e._v("git log")]),e._v(" (and others) like\n"),a("code",[e._v("cat")]),e._v(", instead of "),a("code",[e._v("less")]),e._v(" (content does not disappear). "),a("code",[e._v("git show <COMMIT>")]),e._v(" -\nshows changes introduced by a commit "),a("code",[e._v("git blame <FILE>")]),e._v(" - shows line-by-line,\nwho changed each line and when. "),a("code",[e._v("^")]),e._v(" means that the line was there since the\nbeginning. "),a("code",[e._v("git revert <COMMIT>")]),e._v(" - creates a commit that does the opposite\noperations than the supplied commit. It can also revert multiple commits.\nReverting merge commits is not so straightforward, and requires a bit different\napproach")]),e._v(" "),a("h3",{attrs:{id:"reset"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reset"}},[e._v("#")]),e._v(" Reset")]),e._v(" "),a("p",[a("code",[e._v("git reset")]),e._v(" does different things in different contexts. "),a("code",[e._v("git reset")]),e._v(" moves the\nbranch to another commit. It can work in different modes:")]),e._v(" "),a("p",[a("code",[e._v("--hard")]),e._v(" - it sets the working directory and index to the state of the new\ncommit - useful when working directory changes do not make sense and we want to\nget back to where we started from "),a("code",[e._v("--mixed")]),e._v(' - (default) - it does not change the\nworking directory, only sets the index to the new commit - usefult when we have\nsome changes staged, but we want to unstage them. It optionally accepts a path\nto a file that should be "reset". '),a("code",[e._v("--soft")]),e._v(" - just moves the branch, does not\nmodify working directory, nor index - useful when we want to move back to some\ncommit from the past, modify some stuff, and commit again (rewriting history)")]),e._v(" "),a("p",[e._v("Examples:")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" reset HEAD menu.txt\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" reset --hard HEAD\n")])])]),a("h3",{attrs:{id:"switch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#switch"}},[e._v("#")]),e._v(" Switch")]),e._v(" "),a("p",[e._v("Alternative for "),a("code",[e._v("checkout")]),e._v(". Switches branch. Use "),a("code",[e._v("-c")]),e._v(" to create one.")]),e._v(" "),a("h3",{attrs:{id:"restore"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#restore"}},[e._v("#")]),e._v(" Restore")]),e._v(" "),a("p",[e._v("Alternative for "),a("code",[e._v("checkout")]),e._v(". Restores files from the past.")]),e._v(" "),a("h3",{attrs:{id:"remove-file-from-history"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remove-file-from-history"}},[e._v("#")]),e._v(" Remove file from history")]),e._v(" "),a("p",[e._v("It is possible to remove some file entirely from Git history as if it never\nexisted.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" filter-repo --path menu.txt --invert-paths\n")])])]),a("p",[e._v("Entire history gets rewritten, new commits are created. This command might need\nto be installed on its own.")]),e._v(" "),a("h3",{attrs:{id:"bisect"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bisect"}},[e._v("#")]),e._v(" Bisect")]),e._v(" "),a("p",[a("code",[e._v("git bisect")]),e._v(' allows to find a commit that introduced some issue into the\ncodebase. It can work manually or automatically. We specify the range of commits\nthat the tool will look in. It will check each commit one-by-one, until it finds\nthe "bad" one.')]),e._v(" "),a("h2",{attrs:{id:"attributes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#attributes"}},[e._v("#")]),e._v(" Attributes")]),e._v(" "),a("p",[a("code",[e._v("gitattributes")]),e._v(" file allows to specify various configs.")]),e._v(" "),a("h3",{attrs:{id:"clean-and-smudge-filters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#clean-and-smudge-filters"}},[e._v("#")]),e._v(" Clean and Smudge filters")]),e._v(" "),a("p",[e._v("Git is able to remove sensitive data from specified files when commiting. It is\nalso able to set the sensitive values when checking out the repository. It's\ndone using *"),a("em",[e._v("Git Attributes")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"submodules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#submodules"}},[e._v("#")]),e._v(" Submodules")]),e._v(" "),a("p",[e._v("Submodules is a way to share code between repos. One repo may have many\nsubmodules that it makes use of.")]),e._v(" "),a("h3",{attrs:{id:"adding-submodule"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-submodule"}},[e._v("#")]),e._v(" Adding submodule")]),e._v(" "),a("p",[e._v("There should be some directory for submodules (i.e., "),a("code",[e._v("external/")]),e._v(").")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("REPO_URL"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" external/submodule1\n")])])]),a("p",[e._v("Submodule will be cloned into the selected path. A new file - "),a("code",[e._v(".gitmodules")]),e._v(" -\nwill be created, listing all submodules.")]),e._v(" "),a("h3",{attrs:{id:"more-information-about-submodules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#more-information-about-submodules"}},[e._v("#")]),e._v(" More information about submodules")]),e._v(" "),a("p",[e._v("By default, "),a("code",[e._v("git status")]),e._v(" and "),a("code",[e._v("git diff")]),e._v(" do not show information about\nmodifications to submodules.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" config --global status.submoduleSummary "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" config --global diff.submodule log\n")])])]),a("p",[e._v("Now, "),a("code",[e._v("git status")]),e._v(" will give more information (i.e., submodule added).\nAdditionally, "),a("code",[e._v("git diff")]),e._v(" will show info about submodules.")]),e._v(" "),a("h3",{attrs:{id:"cloning-a-repo-with-submodules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cloning-a-repo-with-submodules"}},[e._v("#")]),e._v(" Cloning a repo with submodules")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("REPO"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update\n")])])]),a("p",[e._v("or")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone --recursive "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("REPO"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n")])])]),a("p",[e._v("The second way will work also if there are nested submodules.")]),e._v(" "),a("h3",{attrs:{id:"syncing-repo-with-submodules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#syncing-repo-with-submodules"}},[e._v("#")]),e._v(" Syncing repo with submodules")]),e._v(" "),a("p",[e._v("When working with a team, the following commands allow to make sure that our\nwhole repo is in sync with remote:")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" pull\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sync")]),e._v(" --recursive\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update --init --recursive\n")])])]),a("h3",{attrs:{id:"updating-submodule"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#updating-submodule"}},[e._v("#")]),e._v(" Updating submodule")]),e._v(" "),a("p",[e._v('When we update a submodule, we need to push it, together with the "main" repo\nthat contains this submodule. By default, we need to do it manually. There is a\nconfig that automates that:')]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" config --global push.recurseSubmodules on-demand\n")])])]),a("p",[e._v("Now, when pushing main repo, also submodules will be pushed.")]),e._v(" "),a("h2",{attrs:{id:"hooks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hooks"}},[e._v("#")]),e._v(" Hooks")]),e._v(" "),a("p",[e._v("There are client-side and server-side hooks that can be added. They will eb run\nautomatically on speicified actions. By default, client-side hooks are stored in\n"),a("code",[e._v(".git/hooks")]),e._v(". Therefore they are not share with the team. This can be chaged via\nconfiguration.")])])}),[],!1,null,null,null);t.default=o.exports}}]);