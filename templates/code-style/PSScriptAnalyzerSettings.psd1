# Reference PSScriptAnalyzer settings of nipscernlab, GUIDELINES.md section 6.
@{
    Severity     = @('Error', 'Warning')
    IncludeRules = @('*')
    Rules        = @{
        PSPlaceOpenBrace           = @{ Enable = $true; OnSameLine = $true }
        PSPlaceCloseBrace          = @{ Enable = $true }
        PSUseConsistentIndentation = @{ Enable = $true; IndentationSize = 4; Kind = 'space' }
        PSUseConsistentWhitespace  = @{ Enable = $true }
        PSAlignAssignmentStatement = @{ Enable = $true }
    }
}
