rule Suspicious_Strings {
    meta:
        description = "Detects suspicious strings in executables"
        author = "Z3maSafe"
        severity = "medium"
    
    strings:
        $cmd1 = "cmd.exe" nocase
        $cmd2 = "powershell" nocase
        $cmd3 = "rundll32" nocase
        
        $net1 = "socket" nocase
        $net2 = "connect" nocase
        $net3 = "wget" nocase
        $net4 = "curl" nocase
        
        $inj1 = "inject" nocase
        $inj2 = "shellcode" nocase
        
        $keylog = "keylog" nocase
        $screenshot = "screenshot" nocase
        
        $enc1 = "base64" nocase
        $enc2 = "encrypt" nocase
        $enc3 = "decrypt" nocase
    
    condition:
        uint16(0) == 0x5A4D and (
            any of ($cmd*) or
            any of ($net*) or
            any of ($inj*) or
            $keylog or
            $screenshot or
            any of ($enc*)
        )
}

rule Suspicious_APIs {
    meta:
        description = "Detects suspicious API imports"
        author = "Z3maSafe"
        severity = "high"
    
    strings:
        $proc1 = "VirtualAlloc" nocase
        $proc2 = "VirtualAllocEx" nocase
        $proc3 = "CreateRemoteThread" nocase
        $proc4 = "WriteProcessMemory" nocase
        $proc5 = "ReadProcessMemory" nocase
        
        $hook1 = "SetWindowsHookEx" nocase
        
        $reg1 = "RegCreateKey" nocase
        $reg2 = "RegSetValue" nocase
        
        $key1 = "GetAsyncKeyState" nocase
        $key2 = "GetKeyState" nocase
    
    condition:
        uint16(0) == 0x5A4D and (
            any of ($proc*) or
            any of ($hook*) or
            any of ($reg*) or
            any of ($key*)
        )
}

rule Known_Packers {
    meta:
        description = "Detects known packer signatures"
        author = "Z3maSafe"
        severity = "medium"
    
    strings:
        $upx1 = "UPX0" nocase
        $upx2 = "UPX1" nocase
        $upx3 = "UPX!" nocase
        
        $aspack = "ASPack" nocase
        
        $themida1 = "Themida" nocase
        $themida2 = ".themida" nocase
        
        $vmprotect = "VMProtect" nocase
        
        $enigma = "Enigma" nocase
        
        $pecompact = "PECompact" nocase
        
        $mpress = "MPRESS" nocase
        
        $fsg = "FSG" nocase
    
    condition:
        uint16(0) == 0x5A4D and (
            any of ($upx*) or
            $aspack or
            any of ($themida*) or
            $vmprotect or
            $enigma or
            $pecompact or
            $mpress or
            $fsg
        )
}