"use client"
import styles from './teminal.module.css'
import React, { useState, useRef, useEffect } from 'react'

interface FileSystemNode {
  name: string
  type: 'file' | 'directory'
  content?: string
  children?: { [key: string]: FileSystemNode }
}

interface HistoryEntry {
  command: string
  output: string[]
  timestamp: Date
  isCrush?: boolean
}

const Terminal: React.FC = () => {
  const [currentDirectory, setCurrentDirectory] = useState('/home/user')
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: [
        'kubash@~ やあみんな、Hello Worldだぜ!',
        'kubash@~ 俺はターミナルのクバッシュだ。よろしくな',
        'kubash@~ 「help」と入力すると使えるコマンドが見れるぜ',
        ''
      ],
      timestamp: new Date(),
      isCrush: true
    }
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [crushMode, setCrushMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)


  const crushResponses = [
    "kubash@~ やあ！調子はどう？コードの波に乗る準備はできてる？",
    "kubash@~ オレはクバッシュ！150歳だけどまだまだ現役だぜ！",
    "kubash@~ 海とターミナルって似てるよな。どっちも広くて謎だらけ！",
    "kubash@~ オレの息子スクワートもコーディング勉強中！Pythonが得意なんだ！",
    "kubash@~ 海では“シェル”コマンドが大活躍…って、ダジャレだぜ！🐚",
    "kubash@~ 東オーストラリア海流はインターネットみたいなもんさ。速くて便利！",
    "kubash@~ コーディングも海も流れに身を任せるのがコツだぜ！",
    "kubash@~ P. Sherman, 42 Wallaby Way, Sydney…魚たちのIPアドレスみたいだろ？",
    "kubash@~ ウミガメもプログラマーもバグを直すんだ。オレたちは“シーバグ”って呼んでるぜ！",
    "kubash@~ 無限ループって最高！ずっと泳いでるみたいだけど、ちゃんと役に立つんだぜ！",
  ]

  // File system simulation
  const [fileSystem] = useState<FileSystemNode>({
    name: '',
    type: 'directory',
    children: {
      home: {
        name: 'home',
        type: 'directory',
        children: {
          user: {
            name: 'user',
            type: 'directory',
            children: {
              'documents': {
                name: 'documents',
                type: 'directory',
                children: {
                  'readme.txt': {
                    name: 'readme.txt',
                    type: 'file',
                    content: 'This is a sample text file.\nYou can read this with the cat command.'
                  },
                  'finding-nemo.txt': {
                    name: 'finding-nemo.txt',
                    type: 'file',
                    content: 'ふーん、ニモはどこにいるのかな？'
                  }
                }
              },
              'ocean': {
                name: 'ocean',
                type: 'directory',
                children: {
                  'east-australian-current.log': {
                    name: 'east-australian-current.log',
                    type: 'file',
                    content: '[情報] 現在の速度: サイコー\n[情報] 水温: サーフィンに最適\n[情報] ノリノリ度: MAX\n[情報] クラッシュの状態: 超イカしてるぜ！'
                  }
                }
              },
              'projects': {
                name: 'projects',
                type: 'directory',
                children: {}
              },
              'hello.txt': {
                name: 'hello.txt',
                type: 'file',
                content: 'Hello World！\nこのターミナルシミュレーターへようこそ。\nkubash@~ やあ！オレのイカしたターミナルへようこそ！'
              }
            }
          }
        }
      },
      bin: {
        name: 'bin',
        type: 'directory',
        children: {
          'bash': { name: 'bash', type: 'file', content: '' },
          'ls': { name: 'ls', type: 'file', content: '' },
          'cat': { name: 'cat', type: 'file', content: '' },
          'crush': { name: 'crush', type: 'file', content: '' }
        }
      },
      etc: {
        name: 'etc',
        type: 'directory',
        children: {}
      }
    }
  })

  // Get current directory node
  const getCurrentDirectoryNode = (): FileSystemNode => {
    const pathParts = currentDirectory.split('/').filter(Boolean)
    let current = fileSystem

    for (const part of pathParts) {
      if (current.children?.[part]) {
        current = current.children[part]
      } else {
        return fileSystem // fallback to root
      }
    }
    return current
  }



  // Command implementations
  const commands = {
    help: () => [
      '使えるコマンド一覧:',
      '  help      - このヘルプを表示',
      '  ls        - ディレクトリの内容を表示',
      '  cd <dir>  - ディレクトリを移動',
      '  pwd       - 現在のディレクトリを表示',
      '  cat <file>- ファイルの内容を表示',
      '  echo <msg>- メッセージを表示',
      '  mkdir <dir> - 新しいディレクトリを作成',
      '  touch <file> - 空のファイルを作成',
      '  clear     - ターミナルをクリア',
      '  date      - 現在の日付と時刻を表示',
      '  whoami    - 現在のユーザー名を表示',
      '  uname     - システム情報を表示',
      '  righteous - クバッシュのありがたい一言',
      '  ocean     - oceanディレクトリを探検',
      '  nemo      - ニモを探す（ヒント: documentsを見てみよう）',
      '  current   - 東オーストラリア海流に乗る',
      '  ping      - クバッシュにpingを送る',
      '  curl <url> - URLの内容を取得',
      '  systemctl - システム情報を表示',
      '  can - socketCAN通信をシミュレート',
      '  exit     - ターミナルを終了',
      'kubash@~ お前さん、なにがしたいんだ？',
      ''
    ],

    dude: () => {
      setCrushMode(!crushMode)
      const response = crushResponses[Math.floor(Math.random() * crushResponses.length)]
      if (!crushMode) {
        return [
          response,
        ]
      } else {
        return [
          'kubash@~ また波に乗ろうぜ',

          ''
        ]
      }
    },

    righteous: () => [
  'kubash@~ クバッシュのありがたい一言だぜ',
  'kubash@~ 「海は魚に流れていいか聞かないぜ」',
  'kubash@~ 「コーディングもサーフィンもタイミングが命」',
  'kubash@~ 「泳ぎ続けよう、コーディングし続けよう！」',
  'kubash@~ 「最高のデバッガーは新しい視点とイカした波だ！」',
      ''
    ],

    ocean: () => {
      setCurrentDirectory('/home/user/ocean')
      return [
        'kubash@~ カウバンガ！oceanディレクトリへようこそ！',
        'kubash@~ current.logをチェックしてみてくれ！',
        ''
      ]
    },

    can: () => {
        return ['kubash@~ 悪いな、今日はCAN\'Tだ', '']
    },

    nemo: () => [
      'kubash@~: ニモを探してるのかい？',
      'kubash@~: documentsフォルダで泳いでるのを見たぜ！',
      'kubash@~: cd documents && cat finding-nemo.txt を試してみてくれ',
      'kubash@~: P. Sherman, シドニーのウォラビー通り42番地…覚えておこう！',
      ''
    ],

    current: () => [
      'kubash@~ ビューン！',
      'kubash@~ 東オーストラリア海流に乗ってるぜ！',
      'kubash@~ 現在の速度: サイコー！',
      'kubash@~ コードの波に乗り続けよう！',
      ''
    ],

    ls: (args: string[]) => {
      const currentNode = getCurrentDirectoryNode()
      if (!currentNode.children) {
        return ['']
      }

      const items = Object.values(currentNode.children)
      if (args.includes('-l')) {
        return items.map(item => {
          const type = item.type === 'directory' ? 'd' : '-'
          const permissions = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--'
          const size = item.type === 'file' ? (item.content?.length || 0) : 4096
          const date = new Date().toLocaleDateString()
          return `${type}${permissions} 1 user user ${size.toString().padStart(8)} ${date} ${item.name}`
        }).concat([''])
      }
      const dirs = items.filter(item => item.type === 'directory').map(item => item.name)
      const files = items.filter(item => item.type === 'file').map(item => item.name)
      return [...dirs, ...files, 'kubash@~ 何か質問があれば聞いてくれよ！']
    },

    pwd: () => [currentDirectory, 'kubash@~ 今いる場所を見失ってないかい？'],

    ping: () => {
        if (crushMode) {
            return ['kubash@~ お前さん、元気かい？', '']
        }
        return ['ping: pong', 'kubash@~ お前さん、どうしたんだい？']
    },

    cd: (args: string[]) => {
      if (args.length === 0) {
        setCurrentDirectory('/home/user')
        return ['']
      }

      const target = args[0]
      if (target === '..') {
        const pathParts = currentDirectory.split('/').filter(Boolean)
        if (pathParts.length > 0) {
          pathParts.pop()
          setCurrentDirectory(`/${pathParts.join('/')}`)
        }
        return ['']
      }

      if (target === '/') {
        setCurrentDirectory('/')
        return ['']
      }

      const currentNode = getCurrentDirectoryNode()
      if (currentNode.children?.[target] && currentNode.children[target].type === 'directory') {
        const newPath = currentDirectory === '/' ? `/${target}` : `${currentDirectory}/${target}`;
        setCurrentDirectory(newPath);
        return [
          'kubash@~ お前さんはどのディレクトリからきたんだ？',
          `kubash@~ オレは「${newPath}」からだな`,
          ''
        ];
      }

      return [`cd: ディレクトリ「${target}」は存在しません。`, ''];
    },

    cat: (args: string[]) => {
      if (args.length === 0) {
        return ['kubash@~ おいおい、ファイル名を指定してくれよ', '']
      }

      const fileName = args[0]
      const currentNode = getCurrentDirectoryNode()

      if (currentNode.children?.[fileName] && currentNode.children[fileName].type === 'file') {
        const content = currentNode.children[fileName].content || ''
        return content.split('\n').concat([''])
      }

      return [`cat: ${fileName}: No such file or directory`, '']
    },

    echo: (args: string[]) => {
      const message = args.join(' ')
      if (crushMode && message) {
        const response = crushResponses[Math.floor(Math.random() * crushResponses.length)]
        return [message, response, '']
      }
      return [message, 'kubash@~ おいおい、誰に話しかけてるんだ？', '']
    },

    clear: () => {
      setHistory([])
      return ['kubash@~ おいやめr..!!']
    },

    date: () => [new Date().toString(), 'kubash@~ そういえばお前さん、こんな時間まで起きてて大丈夫かい？'],

    whoami: () => {
      if (crushMode) {
        return ['Duuude! You\'re talking to Crush, the 150-year-young sea turtle!', '']
      }
      return ['user', 'kubash@~ 自分が誰なのか忘れちまったのかい？', 'kubash@~ これで思い出せるといいんだが']
    },

    uname: () => ['Windows kubash-terminal 5.4.0 x86_64 GNU/Linux (Righteous Edition)', ''],

    mkdir: (args: string[]) => {
      if (args.length === 0) {
        return ['kubash@~ ディレクトリ名を指定してくれよ', '']
      }
      return [`kubash@~ お前さん、まさかウイルスを作ろうとしてるんじゃないだろうな？`, '']
    },

    touch: (args: string[]) => {
      if (args.length === 0) {
        return ['kubash@~ どのファイルを作成するんだ？', '']
      }
      return [`kubash@~ お前さん、そんなファイルは存在しないぜ`, '']
    }
  }

  const executeCommand = (cmd: string) => {
    const [commandName, ...args] = cmd.trim().split(' ').filter(Boolean)

    if (!commandName) {
      return ['']
    }

    // In crush mode, respond to any unrecognized command
    if (crushMode && !commands[commandName as keyof typeof commands]) {
      const response = crushResponses[Math.floor(Math.random() * crushResponses.length)]
      return [
        `🐢 Duuude! "${commandName}" - that's like, totally not a command I know!`,
        response,
        ''
      ]
    }

    if (commands[commandName as keyof typeof commands]) {
      return commands[commandName as keyof typeof commands](args)
    }

    return [`bash: ${commandName}: command not found`, '']
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (command.trim() === '') {
      return
    }

    const output = executeCommand(command)

    setHistory(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }])

    setCommandHistory(prev => [...prev, command])
    setCommand('')
    setHistoryIndex(-1)

  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCommand('')
        } else {
          setHistoryIndex(newIndex)
          setCommand(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const getPrompt = () => {
    const shortPath = currentDirectory.replace('/home/user', '~')
    if (crushMode) {
      return `🐢crush@turtle-talk:${shortPath}$`
    }
    return `user@bash-terminal:${shortPath}$`
  }

  return (
    <div
      className={styles["terminal-root"] + " rounded-xl overflow-hidden"}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={terminalRef}
  className={styles["terminal-history-area"]}
      >
        {history.map((entry, index) => (
          <div key={`${entry.timestamp.getTime()}-${index}`} className={styles["terminal-history-item"]}>
            {entry.command && (
              <div className={styles["terminal-history-line"]}>
                <span className={entry.isCrush ? styles["terminal-prompt-crush"] : styles["terminal-prompt-user"]}>
                  {entry.isCrush ? '🐢crush@turtle-talk:~$' : getPrompt()}
                </span>
                <span className={styles["terminal-command"]}>{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, lineIndex) => (
              <div
                key={`${entry.timestamp.getTime()}-${index}-${lineIndex}`}
                className={line.startsWith('kubash@~') ? styles["terminal-output-kubash"] : styles["terminal-output-user"]}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles["terminal-input-bar"]}>
        <span className={crushMode ? styles["terminal-prompt-crush"] : styles["terminal-prompt-user"]}>
          {getPrompt()}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`${styles["terminal-input-btn"]}`}
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  )
}

export default Terminal
